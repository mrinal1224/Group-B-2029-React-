const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL?.trim() || "gemini-1.5-flash-latest";

function extractJson(text) {
  if (!text) return null;
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const first = raw.indexOf("{");
  const last = raw.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;
  const candidate = raw.slice(first, last + 1);
  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}

function safeSnippet(s, maxLen = 500) {
  const str = String(s ?? "");
  const oneLine = str.replace(/\s+/g, " ").trim();
  return oneLine.length > maxLen ? `${oneLine.slice(0, maxLen)}…` : oneLine;
}

export async function getMoodRecommendations({
  mood,
  count = 5,
  signal,
}) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "Missing VITE_GEMINI_API_KEY. Add it to a .env file and restart the dev server."
    );
  }

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      GEMINI_MODEL
    )}:generateContent` + `?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const prompt = `
You are a movie recommendation engine.
Given a selected MOOD, recommend exactly ${count} movies that fit it.

Rules:
- Return exactly ${count} items.
- Keep reasons short and spoiler-free.
- Output STRICT JSON only (no markdown).
- Randomize Movies and Suggest from Different Langauges

MOOD: ${mood}

Return JSON with this shape:
{
  "mood": string,
  "recommendations": [
    { "title": string, "year": number | null, "reason": string, "language": string }
  ]
}
`.trim();

  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 800,
      responseMimeType: "application/json",
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(
      `Gemini request failed (${res.status}). ${errText}\n\n` +
        `Tip: set VITE_GEMINI_MODEL in your .env (example: gemini-1.5-flash-latest).`
    );
  }

  const data = await res.json();
  const candidate = data?.candidates?.[0];
  if (!candidate) {
    const fb = data?.promptFeedback ?? data?.error ?? null;
    throw new Error(
      `Gemini returned no candidates. Details: ${safeSnippet(
        JSON.stringify(fb)
      )}`
    );
  }

  const parts = candidate?.content?.parts ?? [];
  const text = Array.isArray(parts)
    ? parts.map((p) => p?.text ?? "").join("")
    : "";

  const trimmed = text.trim();
  let parsed = null;
  if (trimmed) {
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      parsed = extractJson(trimmed);
    }
  }

  if (!parsed?.recommendations || !Array.isArray(parsed.recommendations)) {
    const finishReason = candidate?.finishReason ?? "UNKNOWN";
    throw new Error(
      "Gemini returned an unexpected response format.\n\n" +
        `finishReason: ${finishReason}\n` +
        `response snippet: ${safeSnippet(trimmed)}`
    );
  }

  const cleaned = parsed.recommendations.slice(0, count).map((r) => ({
    title: r.title,
    year:
      typeof r.year === "number" && Number.isFinite(r.year) ? r.year : null,
    reason: r.reason,
  }));

  return {
    mood: parsed.mood ?? mood,
    recommendations: cleaned,
  };
}

