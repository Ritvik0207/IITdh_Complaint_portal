/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";

const Complaint = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const fullname = userInfo ? userInfo.name : "";
  const rollNumber = userInfo ? userInfo.roll_no : "";
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [issue, setIssue] = useState("");
  const [photos, setPhotos] = useState([]);
  const [anonymous, setAnonymous] = useState(true);

  const navigate = useNavigate();

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

  const handleDescriptionChange = (event) => {
    const inputDescription = event.target.value;
    setDescription(inputDescription);
    setCharCount(inputDescription.length);
  };

  const handleAnonymousChange = () => {
    setAnonymous(!anonymous);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      if (!fullname || !rollNumber || !subject || !description || !issue) {
        toast.warning("Please fill out all the fields");
        return;
      }
      if (photos.length > 5) {
        toast.warning("Please upload only upto 5 pictures");
        return;
      }

      const token = userInfo.token;

      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("rollNumber", rollNumber);
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("issue", issue);
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });
      formData.append("anonymous", anonymous);

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
        // console.log("Complaint registered successfully:", response.data);
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
        <div className="relative mt-24 border border-gray-100 shadow-gray-500/20 max-w-2xl bg-white rounded-lg shadow-lg">
          <div className="relative border-b border-gray-300 p-4 py-2 ">
            <h3 className="mb-2 inline-block text-3xl font-medium">
              <span className="block">Complaint Form</span>
            </h3>
          </div>

          <div className="p-4">
            <form onSubmit={onSubmitForm}>
              <div className="flex items-center gap-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm text-gray-600 mb-1 ms-1"
                  >
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
                </div>
                <div>
                  <label
                    htmlFor="rollnumber"
                    className="text-sm text-gray-600 mb-1 ms-1"
                  >
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
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4/6">
                  <label
                    htmlFor="subject"
                    className="text-sm text-gray-600 mb-1 ms-1"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    maxLength={45}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full my-2 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none"
                    placeholder="Subject"
                  />
                </div>

                <div className="w-2/6">
                  <label
                    htmlFor="issue"
                    className="text-sm text-gray-600 mb-1 ms-1"
                  >
                    Issue Regarding
                  </label>
                  <select
                    id="issue"
                    value={issue}
                    onChange={handleOptionChange}
                    className="w-full my-2 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select an issue
                    </option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-sm text-gray-600 mb-1 ms-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="5"
                  value={description}
                  onChange={handleDescriptionChange}
                  maxLength={500}
                  className=" w-full resize-y overflow-auto rounded-lg border border-gray-300 p-3 my-2 shadow-sm focus:border-orange-500 focus:outline-none hover:border-white-500"
                  placeholder="Briefly describe the problem you are facing"
                ></textarea>
                <div className="text-sm text-gray-600 flex justify-end me-2">
                  ({charCount}/500)
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  // htmlFor="photos"
                  className="text-sm text-gray-600 mb-1 ms-1"
                >
                  Photos (Limit-5)
                </label>
                <input
                  id="photos"
                  type="file"
                  multiple
                  maxLength={5}
                  onChange={handleFileChange}
                  className="px-1 py-2 w-1/2"
                  title="Relevant Photos"
                />
                <div className="flex flex-wrap py-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative mx-1 mb-2">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Complaint Photo ${index + 1}`}
                        className="w-28 h-28 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute p-1 -top-2 -right-2 bg-gray-50 text-orange-500 rounded-full"
                        onClick={() => handleRemovePhoto(index)}
                      >
                        <LiaTimesSolid size={12} strokeWidth={4} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`flex items-center justify-start gap-1.5 ${
                  issue == "Hostel_affairs" ? "hidden" : ""
                } `}
              >
                <input
                  type="checkbox"
                  id="anonymousCheckbox"
                  onChange={handleAnonymousChange}
                  className="h-4 w-4 border-gray-500 shadow-sm focus:border-orange-500 mx-1"
                />
                <label
                  htmlFor="anonymousCheckbox"
                  className="text-gray-900 font-montserrat"
                >
                  Post complaint on Dashboard
                </label>
              </div>
              <button
                type="submit"
                className="font-montserrat tracking-wide w-full rounded-lg border border-newpurple bg-newpurple p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-[#75237a] hover:bg-[#75237a] focus:bg-[#75237a] focus:border-[#75237a] hover:text-white mt-4"
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
