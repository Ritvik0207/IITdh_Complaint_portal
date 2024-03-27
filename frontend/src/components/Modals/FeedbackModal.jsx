/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "60%",
    padding: "10px",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const FeedbackModal = ({ isOpen, onRequestClose, complaintId }) => {
  const [feedback, setFeedback] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingBar = useRef(null);

  const handleFeedbackChange = (event) => {
    const input = event.target.value;
    setFeedback(input);
    setCharCount(input.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo.token;

      const fetchConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true);
      loadingBar.current.continuousStart();

      const submitResponse = await axios.post(
        "http://localhost:5000/api/user/postfeedback",
        { feedback, complaintId },
        fetchConfig
      );

      loadingBar.current.complete();
      setLoading(false);

      if (!submitResponse.data.success) {
        console.error("Feedback submission failed:", submitResponse.data);
      } else {
        console.log("Feedback submitted successfully:", submitResponse.data);
        toast.success(submitResponse.data.message);
        onRequestClose();
      }
    } catch (error) {
      console.error("An error occurred during feedback submission:", error);
    }
  };

  return (
    <>
      <LoadingBar height={3} color="#f11946" ref={loadingBar} />
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Feedback Modal"
      >
        <div className="max-h-full max-w-full overflow-auto">
          <div className="flex justify-center items-center relative py-4">
            <button
              onClick={onRequestClose}
              className="px-2 py-1 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 focus:outline-none absolute right-0 top-0"
            >
              <FaTimes />
            </button>
            <div className="flex-auto px-6 pt-4">
              <div className="mb-2 flex flex-col flex-shrink-0 flex-grow-0 items-start justify-center overflow-hidden">
                <h4 className="mb-2 text-lg font-semibold text-gray-700 xl:text-xl flex gap-4">
                  Feedback <VscFeedback color={"rgb(249 115 22)"} />
                </h4>
                <p className="mb-2 text-gray-500 text-sm max-phone:text-sm">
                  Help Us Serve You Better - Your Feedback Matters !
                </p>
              </div>

              <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <textarea
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    id="feedback"
                    name="feedback"
                    rows={8}
                    maxLength={500}
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Enter your feedback here"
                    required
                  />
                  <div className="text-sm text-gray-600 flex justify-end me-2">
                    ({charCount}/500)
                  </div>
                </div>

                <div className="w-full flex justify-center items-center">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border bg-newpurple py-2 px-5 text-center align-middle text-sm font-bold text-white shadow hover:border-[#75237a] hover:bg-[#75237a] hover:text-white focus:border-[#75237a] focus:bg-[#75237a] focus:text-white focus:shadow-none tracking-wide"
                    type="submit"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackModal;
