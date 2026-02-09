import React from "react";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState();

  //   function increment() {
  //     setCount(count + 1);
  //   }

  function decrement() {
    setCount(count - 1);
  }

  console.log("Re-Rendered");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <h1>{count}</h1>
      <button onClick={decrement}>Decrement</button>

      <input type="text" onChange={(e) => setText(e.target.value)} />
      <h4>{text}</h4>
    </div>
  );
}

export default Counter;
