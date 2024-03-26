/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaCamera, FaTimes } from "react-icons/fa"; // Import camera and times icons
import PhotoModal from "../components/Modals/PhotoModal";
import LoadingBar from "react-top-loading-bar";

const PrevComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaintsCopy, setComplaintsCopy] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("date");
  const [loading, setLoading] = useState(false);
  const loadingBar = useRef(null);
  const [order, setOrder] = useState("ascending");
  const [showDescription, setShowDescription] = useState({});

  // const toggleDescription = (complaintId) => {
  //   setShowDescription((prevOpenDescriptions) => ({
  //     ...prevOpenDescriptions,
  //     [complaintId]: !prevOpenDescriptions[complaintId],
  //   }));
  // };

  const toggleDescription = (complaintId) => {
    setShowDescription((prevOpenDescriptions) => {
      const updatedDescriptions = {}; // Create an object to store updated description statuses
      // Toggle the clicked complaint's description
      updatedDescriptions[complaintId] = !prevOpenDescriptions[complaintId];
      // Close all other descriptions
      Object.keys(prevOpenDescriptions).forEach((id) => {
        if (id !== complaintId) {
          updatedDescriptions[id] = false;
        }
      });
      return updatedDescriptions; // Return the updated description statuses
    });
  };

  const formatDate = (time) => {
    const date = new Date(time);
    let formattedTime = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedTime;
  };

  const toggleComplaintsOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleCategoryFilter = (category) => {
    // console.log(complaints);
    setSelectedIssue(category);
    if (category === "All") {
      setComplaintsCopy(complaints);
    } else {
      const filteredComplaints = complaints.filter(
        (complaint) => complaint.issue === category
      );
      setComplaintsCopy(filteredComplaints);
    }
  };

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      setLoading(true);
      loadingBar.current.continuousStart();

      const response = await axios.get(
        "http://localhost:5000/api/user/usercomplaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        let sortedComplaints = response.data.complaints;
        if (filterBy === "date") {
          sortedComplaints = sortedComplaints.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (filterBy === "status") {
          sortedComplaints = sortedComplaints.sort((a, b) => {
            // Calculate the number of true values in each complaint
            const trueValuesA = [a.isApproved, a.isAssigned, a.isDone].filter(
              Boolean
            ).length;
            const trueValuesB = [b.isApproved, b.isAssigned, b.isDone].filter(
              Boolean
            ).length;

            // Sort in descending order based on the number of true values
            return trueValuesB - trueValuesA;
          });
        }

        setComplaints(sortedComplaints);
        setComplaintsCopy(sortedComplaints);
        loadingBar.current.complete();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterBy]);

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <LoadingBar height={3} color="#f11946" ref={loadingBar} />
      <div className="relative overflow-auto min-h-screen w-full">
        <div className="flex flex-col justify-center items-center pt-24 px-16">
          <div className="flex justify-end items-end w-full px-6">
            <div className="w-auto p-1 flex items-center justify-center box-border">
              <label
                htmlFor="filter"
                className="text-xl text-gray-600 mx-1 ms-1 font-semibold w-auto text-nowrap"
              >
                Filter By :
              </label>
              <select
                id="filter"
                className="w-28 ms-2 appearance-none rounded-lg border-2 border-gray-400 px-4 py-1.5 shadow-sm focus:border-orange-500 focus:outline-none text-gray-500 font-semibold"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="status">Status</option>
              </select>
              <button
                className="p-2"
                value={order}
                onClick={toggleComplaintsOrder}
              ></button>
            </div>
          </div>
          <div className="flex justify-between items-baseline mb-4 w-full">
            <h1 className="text-gray-600 font-palanquin text-3xl font-bold px-4">
              Your Complaints
            </h1>
            <div className="flex justify-center me-6">
              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors hover:shadow-md"
                  onClick={() => {
                    handleCategoryFilter("Food");
                  }}
                >
                  <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                    Food
                  </div>
                </button>
                <button
                  className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors hover:shadow-md"
                  onClick={() => {
                    handleCategoryFilter("Water");
                  }}
                >
                  <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                    Water
                  </div>
                </button>
                <button
                  className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors hover:shadow-md"
                  onClick={() => {
                    handleCategoryFilter("Electricity");
                  }}
                >
                  <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                    Electricity
                  </div>
                </button>
                <button
                  className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors hover:shadow-md"
                  onClick={() => {
                    handleCategoryFilter("All");
                  }}
                >
                  <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                    All
                  </div>
                </button>
              </div>
            </div>
          </div>
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b">
              <tr className="border-b transition-colors bg-gray-100">
                <th className="h-12 px-4 pe-20 text-center text-base align-middle font-medium w-48">
                  Posted On
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium w-40">
                  Category
                </th>
                <th className="h-12 px-4 text-center text-base align-middle font-medium w-80">
                  Subject & Description
                </th>
                <th className="h-12 px-4 text-center text-base align-middle font-medium w-40">
                  Photos
                </th>
                <th className="h-12 px-4 text-center text-base align-middle font-medium w-96">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="border-0">
              {complaintsCopy.map((complaint) => (
                <tr
                  key={complaint._id}
                  className="border-b transition-colors hover:bg-[#FFFFF0] h-14"
                >
                  <td className="px-8 pt-4 align-top">
                    {formatDate(complaint.createdAt)}
                  </td>
                  <td className="px-4 pt-4 align-top">{complaint.issue}</td>
                  <td className="px-4 pt-4 align-top w-auto h-14">
                    <div className="flex justify-between items-center">
                      {complaint.subject}
                      <button
                        className="ml-2 text-blue-500"
                        onClick={() => toggleDescription(complaint._id)}
                      >
                        {showDescription[complaint._id] ? "↑" : "↓"}
                      </button>
                    </div>

                    {/* Render description if showDescription[complaint._id] is true */}
                    {showDescription[complaint._id] && (
                      <div className="my-2">{complaint.description}</div>
                    )}
                  </td>
                  <td className="text-lg w-40 h-full pt-2.5 align-top">
                    <div className="flex justify-center items-center">
                      {/* {complaint.photos.length > 0 ? ( */}
                      <button
                        className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors rounded-md px-3 py-1 border-2 hover:bg-gray-200 ${
                          complaint.photos.length > 0
                            ? "cursor-pointer"
                            : "cursor-default"
                        }`}
                        title={` ${
                          complaint.photos.length > 0
                            ? "View Attachments"
                            : "No Attached Images"
                        }`}
                        onClick={
                          complaint.photos.length > 0
                            ? () => openModal(complaint)
                            : undefined // Set onClick to undefined when there are no photos
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#f2f2f2"
                          viewBox="0 0 24 24"
                          strokeWidth="1.75"
                          stroke={`${
                            complaint.photos.length > 0 ? "#33ff33" : "#ff3333"
                          }`}
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                          />
                        </svg>
                      </button>
                      {/* ) : (
                        <button
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors rounded-md px-3 py-1 border-2 hover:bg-gray-200 pointer-events-none"
                          title="No Attached Images"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#f2f2f2"
                            viewBox="0 0 24 24"
                            strokeWidth="1.75"
                            stroke="#ff3333"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            />
                          </svg>
                        </button>
                      )} */}
                    </div>
                  </td>
                  <td className="w-auto h-14 align-top pt-3">
                    <div className="flex justify-center items-center">
                      <div className="grid grid-cols-3 gap-4 pointer-events-none">
                        <div
                          className={`inline-flex items-center rounded-full whitespace-nowrap border px-3 py-1.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            complaint.isApproved
                              ? "bg-[#62cf62] text-white"
                              : "bg-[#D9D9D9]"
                          }`}
                        >
                          {complaint.isApproved ? "Approved" : "Not Approved"}
                        </div>
                        <div
                          className={`inline-flex items-center rounded-full whitespace-nowrap border px-3 py-1.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            complaint.isAssigned
                              ? "bg-[#62cf62] text-white"
                              : "bg-[#D9D9D9]"
                          }`}
                        >
                          {complaint.isAssigned ? "Assigned" : "Not Assigned"}
                        </div>
                        <div
                          className={`inline-flex items-center rounded-full whitespace-nowrap border px-3 py-1.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            complaint.isDone
                              ? "bg-[#62cf62] text-white"
                              : "bg-[#D9D9D9]"
                          }`}
                        >
                          {complaint.isDone ? "Done" : "Not Done"}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedComplaint && (
        <PhotoModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          photos={selectedComplaint.photos}
        />
      )}
    </>
  );
};

export default PrevComplaints;
