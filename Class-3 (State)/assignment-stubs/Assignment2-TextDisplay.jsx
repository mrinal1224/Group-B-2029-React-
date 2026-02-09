import React from "react";
// TODO: Import useState from "react"

function TextDisplay() {
  // TODO: Declare state for the input text (initial value: "")
  // Example: const [text, setText] = useState("");

  return (
    <div>
      <label>Type something: </label>
      {/* TODO: Make this a controlled input - add value and onChange */}
      <input type="text" />

      {/* TODO: Display the current text below the input */}
      <p>You typed: </p>
    </div>
  );
}

export default TextDisplay;
