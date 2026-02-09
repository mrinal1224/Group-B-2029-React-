import React from "react";
// TODO: Import useState from "react"

function AgeLabel() {
  // TODO: useState for age (initial value 16)
  // Example: const [age, setAge] = useState(16);

  return (
    <div>
      {/* TODO: Button to increase age - onClick={() => setAge(age + 1)} */}
      <button>Older</button>
      {/* TODO: Replace 0 with {age} after declaring state */}
      <span style={{ margin: "0 10px" }}>{0}</span>
      {/* TODO: Button to decrease age - onClick={() => setAge(age - 1)} */}
      <button>Younger</button>

      {/* TODO: Display "Adult" if age >= 18, otherwise "Minor" - use ternary: age >= 18 ? "Adult" : "Minor" */}
      <p>Status: </p>
    </div>
  );
}

export default AgeLabel;
