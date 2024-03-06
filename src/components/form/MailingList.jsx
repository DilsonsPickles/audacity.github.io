import React, { useState } from "react";

function MailingList() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Email submitted:", email);

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
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
}

export default MailingList;
