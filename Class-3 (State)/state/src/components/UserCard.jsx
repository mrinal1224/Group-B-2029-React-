// Task Overview:
// Create a User Card component that:
//     Accepts a user details object (name, email, age, location, picture) as prop.
//     Displays user details in a card format.
//     Conditionally renders "Adult" or "Minor" based on age.
//     Adds a button to toggle email visibility.

import React, { useState } from "react";
import { User } from "./user.js";

function UserCard() {
  const [showEmail, setShowEmail] = useState(false);

  console.log(showEmail);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor:(User.gender=='Male'? "blue" : 'pink')
      }}
    >
      <img src={User.picture.large} />

      <p>
        Name :{User.name.first} {User.name.last}
      </p>

      <p>{showEmail && User.email}</p>

      <button onClick={() => setShowEmail(true)}>Show Email</button>
      <button onClick={() => setShowEmail(false)}>Hide Email</button>

      <p>
        Age : {User.dob.age} ({User.dob.age >= 18 ? "Adult" : "Minor"})
      </p>
    </div>
  );
}

export default UserCard;
