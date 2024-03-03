/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Complaint = () => {
  const [fullname, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [description, setDescription] = useState("");
  const [issue, setIssue] = useState("");

  const options = ["Food", "Water", "Electricity", "Hostel_affairs"];

  const handleOptionChange = (e) => {
    setIssue(e.target.value);
    // console.log(e.target.value);
  };

  const navigate = useNavigate();
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // Basic form validation (customize as needed)
      if (!fullname || !rollNumber || !description || !issue) {
        toast.warning("Please fill out all the fields");
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
            <div className="flex flex-1 gap-2">
              <input
                id="rollnumber"
                type="text"
                maxLength={9}
                className="w-1/2 my-2 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none "
                placeholder="Roll number"
                onChange={(e) => setRollNumber(e.target.value)}
              />
              {/* <select
                id="issue"
                className="w-full sm:w-auto my-2 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none"
                onChange={(e) => setIssue(e.target.value)}
              >
                <option
                  // disabled
                  defaultValue="Issue Regarding"
                  // style={{ color: "#888888" }}
                >
                  Issue regarding
                </option>
                <option defaultValue="food">Food</option>
                <option defaultValue="water">Water</option>
                <option defaultValue="electricity">Electricity</option>
                <option defaultValue="hostel_affairs">Hostel Affairs</option>
              </select> */}
              <select
                value={issue}
                onChange={handleOptionChange}
                className="w-1/2 my-2 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none "
              >
                <option value="Issue regarding">Issue regarding</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <label className="mt-5 mb-2 mx-1 inline-block max-w-full">
              Brief the problem you are facing
            </label>
            <textarea
              id="about"
              rows="5"
              className="mb-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:outline-none hover:border-white-500"
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
