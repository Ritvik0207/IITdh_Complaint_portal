/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PhotoModal from "../components/Modals/PhotoModal";

const Majorissues = (props) => {
  const [vote, setVote] = useState(props.upvoteCount);
  const [upvoted, setUpvoted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const date = new Date(props.timestamp);
  let time = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const voteClickHandler = () => {
    setUpvoted(!upvoted);
    !upvoted
      ? setVote((voteCount) => voteCount + 1)
      : setVote((voteCount) => voteCount - 1);
    upvotefn();
    console.log(upvoted);
  };

  useEffect(() => {
    // Check if the complaint has been upvoted by the user
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (
      props.upvotedBy &&
      user &&
      user._id &&
      props.upvotedBy.includes(user._id)
    ) {
      setUpvoted(true);
    } else {
      setUpvoted(false); // Reset upvote status when user changes
    }
  }, [props.upvotedBy]);

  const upvotefn = async () => {
    console.log("up vote function working");
    if (!upvoted) {
      console.log(upvoted);
      try {
        const token = JSON.parse(localStorage.getItem("userInfo")).token;

        const response = await axios.post(
          `http://localhost:5000/api/user/complaints/upvote/${props.complaintId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        }
        setUpvoted(true);
      } catch (error) {
        console.error("Error upvoting complaint:", error);
      }
    }
  };

  return (
    <div className="py-4 px-6 bg-white rounded-lg shadow-md mb-6 border-2 border-t-newpurple flex flex-col justify-center">
      <div className="flex items-center py-2 space-x-4">
        <div className="text-lg text-gray-700 leading-loose tracking-wide font-semibold">
          {props.subject}
        </div>
        <div className="bg-orange-500 text-white rounded-xl px-2  font-semibold">
          {props.issue}
        </div>
      </div>
      <div className="text-sm text-gray-700 leading-tight pb-3">
        {props.description}
      </div>
      <div className="flex pb-2">
        {props.photos.length > 0 && (
          <a
            className="text-blue-500 underline cursor-pointer"
            onClick={openModal}
          >
            Read more
          </a>
        )}
      </div>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex w-auto items-center justify-start">
          <div className=" font-medium text-sm flex">
            {/* Complaint ID:
            <div className="text-sm font-normal text-gray-600 ms-1">
              {props.complaintId}
            </div> */}
          </div>
          <time
            className="opacity-80 flex items-center gap-1"
            dateTime="2023-09-15T09:45:00Z"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            {time}
          </time>
        </div>
        <button
          className={`w-auto flex justify-center items-center border border-gray-300 rounded-3xl transition duration-100 ${
            upvoted ? "bg-orange-500 text-white" : "bg-white text-gray-700"
          }`}
          onClick={voteClickHandler}
          disabled={upvoted}
        >
          <div
            className={`rounded-full ${
              upvoted ? "hover:bg-orange-300" : "hover:bg-gray-100"
            }  m-1`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 m-1"
            >
              <path
                d="M9.8 21C9.51997 21 9.37996 21 9.273 20.9455C9.17892 20.8976 9.10243 20.8211 9.0545 20.727C9 20.62 9 20.48 9 20.2V10H5L12 3L19 10H15V20.2C15 20.48 15 20.62 14.9455 20.727C14.8976 20.8211 14.8211 20.8976 14.727 20.9455C14.62 21 14.48 21 14.2 21H9.8Z"
                stroke={upvoted ? "white" : "rgb(156, 163, 175) "}
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
                // className={`transition-colors ${
                //   upvoted ? "hover:stroke-[#7C838F]" : "hover:stroke-white"
                // }`}
              />
            </svg>
          </div>
          <div
            className={`text-md font-bold ${
              upvoted ? "text-white" : "text-[#7C838F]"
            } pe-[10px] py-1`}
          >
            {vote == 0 ? "Vote" : vote}
          </div>
        </button>
      </div>

      <PhotoModal
        subject={props.subject}
        description={props.description}
        time={time}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        photos={props.photos}
      />
    </div>
  );
};

export default Majorissues;
