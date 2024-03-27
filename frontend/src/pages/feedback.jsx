import React, { useState } from "react";
import { Link } from "react-router-dom";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send feedback to the server
    console.log("Feedback submitted:", feedback);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <div className="relative mt-20">
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-6 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <span className="flex items-center gap-2 text-[#89288f] flex-shrink-0 text-3xl font-medium tracking-normal opacity-100">
                Feedback
              </span>
            </div>

            <form className="mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="feedback"
                  className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                >
                  Feedback
                </label>
                <textarea
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  id="feedback"
                  name="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback here"
                  required
                />
              </div>

              <div className="mb-4 w-full flex justify-center items-center py-3">
                <button
                  className="grid w-full cursor-pointer select-none rounded-md border bg-newpurple py-2 px-5 text-center align-middle text-sm font-bold text-white shadow hover:border-[#75237a] hover:bg-[#75237a] hover:text-white focus:border-[#75237a] focus:bg-[#75237a] focus:text-white focus:shadow-none tracking-wide"
                  type="submit"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
            <p className="mb-4 text-center">
              <Link
                to="/"
                className="cursor-pointer text-newpurple underline hover:text-orange-500 hover:underline-offset-2 ms-2"
              >
                Go back
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
