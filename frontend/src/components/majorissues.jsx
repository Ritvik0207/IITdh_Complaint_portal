import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Majorissues = (props) => {
  const [vote, setVote] = useState(props.upvoteCount);
  const [upvoted, setUpvoted] = useState(false);

  useEffect(() => {
    // Check if the complaint has been upvoted by the user
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (props.upvotedBy && user && user._id && props.upvotedBy.includes(user._id)) {
      setUpvoted(true);
    } else {
      setUpvoted(false); // Reset upvote status when user changes
    }
  }, [props.upvotedBy]);

  const upvotefn = async () => {
    if (!upvoted) {
      try {
        const token = JSON.parse(localStorage.getItem("userInfo")).token;

        const response = await axios.post(`http://localhost:5000/api/user/complaints/upvote/${props.complaintId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response) {
          if (response.data.success) {
            toast.success(response.data.message);
            setVote(prev => prev + 1);
          } else {
            toast.warning(response.data.message);
          }
        }

        setUpvoted(true);
      } catch (error) {
        console.error('Error upvoting complaint:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="font-bold text-lg text-gray-700">{props.category}</span>
          <span className="block text-sm text-gray-600 mt-1">{props.timestamp}</span>
        </div>
        <div className="flex items-center">
          <button
            className={`px-3 py-1 mr-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none transition duration-300 ${upvoted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={upvotefn}
            disabled={upvoted}
          >
            Upvote
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${upvoted ? 'text-gray-400' : 'text-white'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <span className="text-md font-bold text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
            {vote}
          </span>
        </div>
      </div>
      <div className="text-gray-700 leading-relaxed mb-4">
        <div className="mb-2">
          <span className="font-semibold">Complaint ID:</span> {props.complaintId}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Description:</span> {props.description}
        </div>
      </div>
    </div>
  );
};

export default Majorissues;
