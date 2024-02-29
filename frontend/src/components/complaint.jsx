/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar2 } from "./components";

const Complaint = () => {
  const [fullname, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [description, setDescription] = useState("");
  const [issue, setIssue] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // Basic form validation (customize as needed)
      if (!fullname || !rollNumber || !description || !issue) {
        console.error("All fields are required.");
        return;
      }

      // Get the token from localStorage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header with the bearer token
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
        config // Pass the config object as the third argument
      );

      if (!response.data.success) {
        console.error("Complaint registration failed:", response.data);
      } else {
        console.log("Complaint registered successfully:", response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("An error occurred during complaint registration:", error);
    }
  };


  return (
    <>
      <Navbar2 />
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <div className="relative mt-20 border border-gray-100 shadow-gray-500/20 max-w-md bg-white rounded-lg shadow-lg">
          <div className="relative border-b border-gray-300 p-4 py-2 ">
            <h3 className="mb-2 inline-block text-3xl font-medium">
              <span className=" block">Complaint Form</span>
              <span className="inline-block rounded-md bg-gray-100 px-2 py-2 text-sm text-orange-600 ">
                Quick Response
              </span>
            </h3>
          </div>
          <div className="p-4">
            <input
              id="name"
              type="text"
              className="my-2 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none "
              placeholder="Enter your name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                id="rollnumber"
                type="text"
                className="w-full sm:w-auto my-2 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none "
                placeholder="Roll number"
                onChange={(e) => setRollNumber(e.target.value)}
              />
              <select
                id="issue"
                className="w-full sm:w-auto my-2 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none"
                onChange={(e) => setIssue(e.target.value)}
              >
                <option disabled value="" selected style={{ color: "#888888" }}>
                  Issue regarding
                </option>
                <option value="food">Food</option>
                <option value="water">Water</option>
                <option value="electricity">Electricity</option>
                <option value="hostel_affairs">Hostel Affairs</option>
              </select>
            </div>
            <label className="mt-5 mb-2 inline-block max-w-full">
              Brief the problem you are facing
            </label>
            <textarea
              id="about"
              className="mb-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-6 py-6 shadow-sm focus:border-orange-500 focus:outline-none hover:border-white-500"
              onChange={(e) => setDescription(e.target.value)}
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
