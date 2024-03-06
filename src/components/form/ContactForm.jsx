import React, { useState } from "react";

// Your Astro.js component
const ContactForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/.netlify/functions/addToContactList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Handle successful response
        console.log("User added to SendGrid contact list successfully!");
      } else {
        // Handle error response
        console.error(
          "Error adding user to SendGrid contact list:",
          response.statusText
        );
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error adding user to SendGrid contact list:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default ContactForm;
