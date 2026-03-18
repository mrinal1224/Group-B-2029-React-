import React, { useMemo, useRef, useState } from "react";
import { getMoodRecommendations } from "../lib/gemini";

function MoodSelector() {
  const [mood, setMood] = useState("Chill / Cozy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const abortRef = useRef(null);

  const moods = useMemo(
    () => [
      "Chill / Cozy",
      "Hype / Action",
      "Laugh",
      "Mind-bending",
      "Romance",
      "Spooky",
      "Inspiring",
      "Family",
    ],
    []
  );

  async function handleGenerate() {
    setError("");
    setResults([]);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const rec = await getMoodRecommendations({
        mood,
        count: 5,
        signal: controller.signal,
      });
      setResults(rec.recommendations ?? []);
    } catch (e) {
      if (e?.name !== "AbortError") {
        setError(e?.message || "Failed to generate recommendations.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900">Mood Selector</h1>
        <p className="text-sm text-gray-600 mt-1">
          Pick a mood and I’ll suggest 5 movies to match it.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Select a mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {moods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={
              loading
                ? "rounded-lg bg-blue-600/60 px-5 py-2.5 text-white font-semibold shadow-sm"
                : "rounded-lg bg-blue-600 px-5 py-2.5 text-white font-semibold shadow-sm hover:bg-blue-700 transition-colors"
            }
          >
            {loading ? "Thinking..." : "Recommend 5"}
          </button>
        </div>

        {error ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {results?.length ? (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recommendations for “{mood}”
            </h2>
            <ul className="mt-3 space-y-3">
              {results.map((r, idx) => (
                <li
                  key={`${r.title}-${idx}`}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {idx + 1}. {r.title}
                        {r.year ? (
                          <span className="text-gray-500 font-medium">
                            {" "}
                            ({r.year})
                          </span>
                        ) : null}
                      </div>
                      {r.reason ? (
                        <div className="mt-1 text-sm text-gray-700">
                          {r.reason}
                        </div>
                        
                        
                      ) : null}

                      
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MoodSelector