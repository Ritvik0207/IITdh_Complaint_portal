/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { IoCloudUpload } from "react-icons/io5";
import OutsideClickHandler from "react-outside-click-handler";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

const Complaint = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const fullname = userInfo ? userInfo.name : "";
  const rollNumber = userInfo ? userInfo.roll_no : "";
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [issue, setIssue] = useState("Issue");
  const [issueDropdown, setIssueDropdown] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [anonymous, setAnonymous] = useState(true);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const options = ["Food", "Water", "Electricity", "Hostel_affairs"];

  const handleOptionChange = (issue) => {
    setIssue(issue);
    setIssueDropdown(false);
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...filesArray].slice(0, 5));
    // Ensure only up to 5 files are selected
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const handleLabelClick = () => {
    fileInputRef.current.click();
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
      <section className="min-h-screen w-full grid sm:bg-gray-50">
        <div className="h-full pt-14">
          <div className="h-full flex justify-center items-center py-6">
            <div className="max-w-2xl max-[400px]:w-full bg-white rounded-lg shadow-lg max-[400px]:shadow-none">
              {/* Heading */}
              <div className="border-b border-gray-400 p-4 py-2 ">
                <h3 className="inline-block text-3xl max-sm:text-2xl max-phone:text-[24px] font-medium">
                  <span className="block">Complaint Form</span>
                </h3>
              </div>

              <div className="p-4 max-[400px]:p-2">
                <form
                  onSubmit={onSubmitForm}
                  className="accent-orange-500"
                  method="POST"
                >
                  <div className="min-[400px]:flex items-center gap-2">
                    {/* Full Name Input Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="inline-block text-sm text-gray-600 mb-1 ml-1"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={fullname}
                        readOnly
                        className="mb-2 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none bg-gray-200"
                      />
                    </div>
                    {/* Roll Number Input Field */}
                    <div>
                      <label
                        htmlFor="rollnumber"
                        className="inline-block text-sm text-gray-600 mb-1 ml-1"
                      >
                        Roll Number
                      </label>
                      <input
                        id="rollnumber"
                        type="text"
                        value={rollNumber}
                        readOnly
                        maxLength={9}
                        className="mb-2 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none bg-gray-200"
                      />
                    </div>
                  </div>

                  <div className="items-center gap-2 min-[400px]:flex ">
                    {/* Subject Input Field */}
                    <div className="w-4/6 max-[400px]:w-full">
                      <label
                        htmlFor="subject"
                        className="inline-block text-sm text-gray-600 mb-1 ml-1"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={subject}
                        maxLength={45}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mb-2 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none"
                        placeholder="Subject"
                      />
                    </div>

                    {/* Issue Dropdown Field*/}
                    <div className="w-2/6 max-[400px]:w-full">
                      <div className="flex-1 relative">
                        <label
                          htmlFor="issue"
                          className="inline-block text-sm text-gray-600 mb-1 ml-1"
                        >
                          Issue Regarding
                        </label>
                        <OutsideClickHandler
                          onOutsideClick={() => setIssueDropdown(false)}
                        >
                          <div className="relative">
                            <input
                              id="issue"
                              type="button"
                              value={issue}
                              className="mb-2 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none text-left"
                              onFocus={() => setIssueDropdown(true)}
                            />
                            {issueDropdown ? (
                              <button
                                type="button"
                                onClick={() => setIssueDropdown(false)}
                                tabIndex="-1"
                              >
                                <IoChevronUp className="absolute right-3 max-sm:right-1.5 top-5 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setIssueDropdown(true)}
                                tabIndex="-1"
                              >
                                <IoChevronDown className="absolute right-3 max-sm:right-1.5 top-5 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                              </button>
                            )}
                          </div>
                          {issueDropdown && (
                            <div className="absolute space-y-1 top-full left-1/2 text-nowrap transform -translate-x-1/2 -translate-y-1 w-40 bg-white border rounded-md shadow-md p-1 z-10">
                              {options.map((item) => (
                                <div
                                  key={item}
                                  className="flex justify-start items-center gap-1 w-full"
                                >
                                  <button
                                    type="button"
                                    className="w-full text-left px-3 border-2 border-transparent hover:bg-gray-100 rounded-md focus:bg-gray-100 focus:outline-none focus:rounded-sm"
                                    onClick={() => handleOptionChange(item)}
                                  >
                                    {item}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </OutsideClickHandler>
                      </div>
                      {/* <label
                        htmlFor="issue"
                        className="inline-block text-sm text-gray-600 mb-1 ml-1"
                      >
                        Issue Regarding
                      </label>
                      <select
                        id="issue"
                        value={issue}
                        onChange={handleOptionChange}
                        className="mb-2 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none"
                      >
                        <option value="" disabled>
                          Issue
                        </option>
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select> */}
                    </div>
                  </div>

                  {/* Description Input Field */}
                  <div className="mb-2">
                    <label
                      htmlFor="description"
                      className="inline-block text-sm text-gray-600 mb-1 ml-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="5"
                      value={description}
                      onChange={handleDescriptionChange}
                      maxLength={500}
                      className="custom-scrollbar w-full h-28 min-h-12 resize-y overflow-auto rounded-lg border border-gray-300 p-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none hover:border-white-500 caret-orange-500 max-[400px]:text-xs"
                      placeholder="Briefly describe the problem you are facing"
                    />
                    <style>{`

                      #subject::placeholder{
                        font-size: 1rem;
                      }

                      @media (max-width: 400px) {
                        #subject::placeholder {
                          font-size: 0.75rem;
                        }
                      }

                      #description::placeholder {
                        font-size: 1rem;
                      }

                      @media (max-width: 400px) {
                        #description::placeholder {
                          font-size: 0.75rem;
                        }
                      }

                      .custom-scrollbar::-webkit-scrollbar {
                        width: 0.5rem;
                      }

                      .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                        border-radius: 1rem;
                      }

                      .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: gray;
                        border-radius: 1rem;
                      }

                      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #555;
                      }
                    `}</style>
                    <div className="font-semibold text-xs text-gray-600 flex justify-end me-2">
                      ({charCount}/500)
                    </div>
                  </div>

                  {/* Photos Input Field */}
                  <div className="flex items-center justify-center w-full mb-4">
                    <div
                      htmlFor="photos"
                      className="w-full h-auto min-h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      onClick={handleLabelClick}
                    >
                      {photos.length != 0 ? (
                        <div className="flex flex-wrap py-2">
                          {photos.map((photo, index) => (
                            <div key={index} className="relative mx-1 z-10">
                              <img
                                src={URL.createObjectURL(photo)}
                                alt={`Complaint Photo ${index + 1}`}
                                className="w-28 h-28 object-cover rounded-lg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              />
                              <button
                                type="button"
                                className="absolute p-1 -top-2 -right-2 bg-gray-50 text-orange-500 rounded-full hover:bg-gray-200"
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevent triggering the label click
                                  handleRemovePhoto(index);
                                }}
                              >
                                <LiaTimesSolid size={12} strokeWidth={4} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <div className="w-full">
                            <IoCloudUpload size={30} className="mx-auto" />
                          </div>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG (MAX. 5 items)
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      id="photos"
                      type="file"
                      className="hidden px-1 py-2 w-1/2"
                      multiple
                      maxLength={5}
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Anonymous Checkbox */}
                  <div
                    className={`flex items-center justify-start gap-1.5 
                    ${issue == options[3] && "hidden"}`}
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
        </div>
      </section>
    </>
  );
};

export default Complaint;
