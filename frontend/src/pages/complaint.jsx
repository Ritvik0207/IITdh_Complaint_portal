/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Complaint = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [fullname, setFullName] = useState(userInfo ? userInfo.name : "");
  const [rollNumber, setRollNumber] = useState(userInfo ? userInfo.roll_no : "");
  const [description, setDescription] = useState("");
  const [issue, setIssue] = useState("");
  const [photos, setPhotos] = useState([]);

  const options = ["Food", "Water", "Electricity", "Hostel_affairs"];

  const handleOptionChange = (e) => {
    setIssue(e.target.value);
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setPhotos([...photos, ...filesArray]);
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      if (!fullname || !rollNumber || !description || !issue) {
        toast.warning("Please fill out all the fields");
        return;
      }
      if (photos.length > 5) {
        toast.warning("Please upload only upto 5 pictures");
        return;
      }

      const token = userInfo.token;

      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('rollNumber', rollNumber);
      formData.append('description', description);
      formData.append('issue', issue);
      photos.forEach((photo) => {
        formData.append('photos', photo);
      });


      const config = {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/user/postcomplaint",
        formData,
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
            <form onSubmit={onSubmitForm}>
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
                className=" w-full resize-y overflow-auto rounded-lg border border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:outline-none hover:border-white-500"
                placeholder="Briefly describe the problem you are facing"
              ></textarea>
              <label htmlFor="photos" className="text-sm text-gray-600 mb-1 block mt-4">
                Photos(MAX-5)
              </label>
              <input
                id="photos"
                type="file"
                multiple
                onChange={handleFileChange}
                className="mb-2 w-full resize-y overflow-auto rounded-lg border border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:outline-none hover:border-white-500"
              />
              <div className="flex flex-wrap">
                {photos.map((photo, index) => (
                  <div key={index} className="relative mr-2 mb-2">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Complaint Photo ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-white text-red-500 rounded-full p-1"
                      onClick={() => handleRemovePhoto(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6 9a1 1 0 112 0v5a1 1 0 11-2 0V9zm6-1a1 1 0 00-1-1H7a1 1 0 100 2h4a1 1 0 001-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg border border-newpurple bg-newpurple p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-[#75237a] hover:bg-[#75237a] focus:bg-[#75237a] focus:border-[#75237a] hover:text-white mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complaint;
