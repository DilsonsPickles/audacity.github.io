import React, { useState } from "react";

// Your Astro.js component
const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false)

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
        setSubmitted(true);
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
    <div class="mt-4">
      {submitted ? (
        <div>You're all signed up!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div class="flex gap-3">
            <input
              class="flex h-12 border border-gray-400 rounded-md w-full px-3"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              class="flex w-40 justify-center items-center rounded-md bg-blue-700 text-nowrap text-white hover:bg-blue-600"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
