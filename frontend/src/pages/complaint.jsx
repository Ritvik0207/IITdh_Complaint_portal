import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Complaint = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [fullname, setFullName] = useState(userInfo ? userInfo.name : "");
  const [rollNumber, setRollNumber] = useState(userInfo ? userInfo.roll_no : "");
  const [description, setDescription] = useState("");
  const [issue, setIssue] = useState("");

  const options = ["Food", "Water", "Electricity", "Hostel_affairs"];

  const handleOptionChange = (e) => {
    setIssue(e.target.value);
  };

  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      if (!fullname || !rollNumber || !description || !issue) {
        toast.warning("Please fill out all the fields");
        return;
      }

      const token = userInfo.token; // Using token from userInfo

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/user/postcomplaint",
        {
          fullname,
          rollNumber,
          description,
          issue,
        },
        config
      );

      if (!response.data.success) {
        console.error("Complaint registration failed:", response.data);
        toast.warning("Complaint registration failed");
      } else {
        console.log("Complaint registered successfully:", response.data);
        toast.success("Complaint registered successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("An error occurred during complaint registration:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <div className="relative mt-20 border border-gray-100 shadow-gray-500/20 max-w-md bg-white rounded-lg shadow-lg">
          <div className="relative border-b border-gray-300 p-4 py-2 ">
            <h3 className="mb-2 inline-block text-3xl font-medium">
              <span className="block">Complaint Form</span>
            </h3>
          </div>
          <div className="p-4">
            <label htmlFor="name" className="text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={fullname}
              readOnly
              className="my-2 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none bg-gray-200"
              placeholder="Enter your name"
            />
            <label htmlFor="rollnumber" className="text-sm text-gray-600 mb-1">
              Roll Number
            </label>
            <input
              id="rollnumber"
              type="text"
              value={rollNumber}
              readOnly
              maxLength={9}
              className="w-full my-2 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none bg-gray-200"
              placeholder="Roll number"
            />
            <label htmlFor="issue" className="text-sm text-gray-600 mb-1 block mt-4">
              Issue Regarding
            </label>
            <select
              id="issue"
              value={issue}
              onChange={handleOptionChange}
              className="w-full my-2 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none"
            >
              <option value="">Select an issue</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="description" className="text-sm text-gray-600 mb-1 block mt-4">
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:outline-none hover:border-white-500"
              placeholder="Briefly describe the problem you are facing"
            ></textarea>
            <button
              className="w-full rounded-lg border border-newpurple bg-newpurple p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-[#75237a] hover:bg-[#75237a] focus:bg-[#75237a] focus:border-[#75237a] hover:text-white"
              onClick={onSubmitForm}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complaint;
