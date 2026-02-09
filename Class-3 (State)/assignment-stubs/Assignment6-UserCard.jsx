import React from "react";
// TODO: Import useState from "react"

// Sample user - you can change the values
const user = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
};

function UserCard() {
  // TODO: useState for showEmail (initial false)
  // Example: const [showEmail, setShowEmail] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "300px",
      }}
    >
      <p><strong>Name:</strong> </p>
      {/* TODO: Display user.name above */}

      {/* TODO: Show email only when showEmail is true - use {showEmail && <p>...</p>} */}

      {/* TODO: Show Email button - onClick set showEmail to true */}
      <button>Show Email</button>

      {/* TODO: Hide Email button - onClick set showEmail to false */}
      <button>Hide Email</button>
    </div>
  );
}

export default UserCard;
