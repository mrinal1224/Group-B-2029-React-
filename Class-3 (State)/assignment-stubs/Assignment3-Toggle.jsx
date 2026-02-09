import React from "react";
// TODO: Import useState from "react"

function Toggle() {
  // TODO: Declare boolean state (e.g. visible / isVisible) with initial value false
  // Example: const [visible, setVisible] = useState(false);

  return (
    <div>
      {/* TODO: Button that toggles the boolean state on click - use setVisible(!visible) */}
      <button>Toggle visibility</button>

      {/* TODO: Conditionally render the message only when state is true */}
      {/* Example: {visible && <p>Hello! This is visible.</p>} */}
    </div>
  );
}

export default Toggle;
