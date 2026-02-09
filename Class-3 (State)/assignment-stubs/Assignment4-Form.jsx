import React from "react";
// TODO: Import useState from "react"

function SimpleForm() {
  // TODO: useState for name (initial "")
  // TODO: useState for email (initial "")

  function handleSubmit() {
    // TODO: Log an object with name and email to console (e.g. console.log({ name, email }))
    // TODO: Reset both name and email to "" by calling both setters
  }

  return (
    <div>
      <h2>Simple Form</h2>

      <label>Name</label>
      {/* TODO: Controlled input - value={name} onChange={(e) => setName(e.target.value)} */}
      <input type="text" />

      <label>Email</label>
      {/* TODO: Controlled input - value={email} onChange={(e) => setEmail(e.target.value)} */}
      <input type="text" />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SimpleForm;
