import React from "react";
import { useState , useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState();

  //   function increment() {
  //     setCount(count + 1);
  //   }

  function decrement() {
    setCount(count - 1);
  }
  // Basic useEffect (not genreally used )
  useEffect(()=>{
    console.log('Use Effects Runs')
    document.title = `You clicked ${count} times`
  })


 // useEffect depenededent on State with dependency Array
  // useEffect(()=>{
  //   console.log('Use Effects Runs')
  //   document.title = `You clicked ${count} times`
  // }, [count])


 // useEffect not depenedent on state only runs once at the end of render cycle

  // useEffect(()=>{
  //   console.log('Use Effects Runs')
  //   document.title = `You clicked ${count} times`
  // } , [])

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
