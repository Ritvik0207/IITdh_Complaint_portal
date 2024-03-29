/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi2";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
// import { FaCameraRetro } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import PhotoModal from "../components/Modals/PhotoModal";
import LoadingBar from "react-top-loading-bar";
import FeedbackModal from "../components/Modals/FeedbackModal";

const PrevComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [completedComplaints, setCompletedComplaints] = useState([]);
  const [pendingCopy, setPendingCopy] = useState([]);
  const [completedCopy, setCompletedCopy] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("date");
  const [loading, setLoading] = useState(false);
  const loadingBar = useRef(null);
  const [descending, setDescending] = useState(true);
  const [showDescription, setShowDescription] = useState({});

  const formatDate = (time) => {
    const date = new Date(time);
    let formattedTime = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedTime;
  };

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
      return updatedDescriptions;
    });
  };

  const toggleComplaintsOrder = () => {
    setDescending(!descending);
    setPendingCopy(pendingCopy.sort().reverse());
    setCompletedCopy(completedCopy.sort().reverse());
  };

  const handleCategoryFilter = (category) => {
    setSelectedIssue(category);
    if (category === "All") {
      setPendingCopy(pendingComplaints);
      setCompletedCopy(completedComplaints);
    } else {
      const filteredPendingComplaints = pendingComplaints.filter(
        (complaint) => complaint.issue === category
      );
      const filteredCompletedComplaints = completedComplaints.filter(
        (complaint) => complaint.issue === category
      );
      setPendingCopy(filteredPendingComplaints);
      setCompletedCopy(filteredCompletedComplaints);
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
        const totalComplaints = response.data.complaints;

        // Divide complaints into pending and completed
        const pendingComplaints = totalComplaints.filter(
          (complaint) => !complaint.isApproved || !complaint.isDone
        );

        const completedComplaints = totalComplaints.filter(
          (complaint) => complaint.isApproved && complaint.isDone
        );

        let sortedPendingComplaints, sortedCompletedComplaints;

        // Sort pending complaints based on the filter condition
        if (filterBy === "date") {
          sortedPendingComplaints = pendingComplaints.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          sortedCompletedComplaints = completedComplaints.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (filterBy === "progress") {
          sortedPendingComplaints = pendingComplaints.sort((a, b) => {
            const trueValuesA = [a.isApproved, a.isAssigned].filter(
              Boolean
            ).length;
            const trueValuesB = [b.isApproved, b.isAssigned].filter(
              Boolean
            ).length;
            return trueValuesB - trueValuesA;
          });
          sortedCompletedComplaints = completedComplaints.sort((a, b) => {
            const trueValuesA = [a.isApproved, a.isAssigned].filter(
              Boolean
            ).length;
            const trueValuesB = [b.isApproved, b.isAssigned].filter(
              Boolean
            ).length;
            return trueValuesB - trueValuesA;
          });
        }

        setPendingComplaints(sortedPendingComplaints);
        setCompletedComplaints(sortedCompletedComplaints);
        setPendingCopy(sortedPendingComplaints);
        setCompletedCopy(sortedCompletedComplaints);
        setComplaints(totalComplaints);

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

  const openPhotoModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsPhotoModalOpen(true);
  };

  const openFeedbackModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsFeedbackModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setIsPhotoModalOpen(false);
    setIsFeedbackModalOpen(false);
  };

  return (
    <>
      <LoadingBar height={3} color="#f11946" ref={loadingBar} />
      <div className="relative overflow-auto min-h-screen w-full">
        <div className="relative overflow-auto w-full">
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
                  className="w-28 ms-2 appearance-none rounded-lg border-2 border-gray-400 px-4 py-1 shadow-sm focus:border-orange-500 focus:outline-none text-gray-500 font-semibold cursor-pointer"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="date">Date</option>
                  <option value="progress">Progress</option>
                </select>
                <button
                  className="ms-1 p-2 border-2 border-gray-100 rounded-xl hover:bg-gray-100"
                  value={descending}
                  title="Reverse sort direction"
                  onClick={toggleComplaintsOrder}
                >
                  {descending ? <FaArrowDown /> : <FaArrowUp />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-baseline mb-6 w-full">
              <h1 className="text-gray-600 font-palanquin text-3xl font-bold px-4">
                Pending Work Requests
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
            {pendingCopy.length == 0 && !loading ? (
              <div className="flex justify-center items-center h-full w-full">
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 text-center w-full">
                  <h2 className="text-xl font-semibold text-gray-800 mt-4">
                    No Pending Complaints
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    Post a complaint and check updates!
                  </p>
                </div>
              </div>
            ) : (
              <>
                <table className="w-full h-auto caption-bottom text-sm border-2 border-gray-200 rounded-lg">
                  <thead className="border-b">
                    <tr className="border-b transition-colors bg-gray-100">
                      <th className="h-12 w-48 px-4 pe-20 text-center text-base align-middle font-medium">
                        Posted On
                      </th>
                      <th className="h-12 w-40 px-4 text-left align-middle font-medium">
                        Category
                      </th>
                      <th className="h-12 w-80 px-4 text-center text-base align-middle font-medium">
                        Subject & Description
                      </th>
                      <th className="h-12 w-40 px-4 text-center text-base align-middle font-medium">
                        Photos
                      </th>
                      <th className="h-12 w-96 px-4 text-center text-base align-middle font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {pendingCopy.map((complaint) => (
                      <tr
                        key={complaint._id}
                        className="border-b transition-colors hover:bg-[#FFFFF0] h-14"
                      >
                        <td className="px-8 pt-4 align-top">
                          {formatDate(complaint.createdAt)}
                        </td>
                        <td className="px-4 pt-4 align-top">
                          {complaint.issue}
                        </td>
                        <td className="px-4 pt-4 align-top">
                          <div className="flex justify-between items-center">
                            {complaint.subject}
                            <button
                              className="border-2 border-transparent hover:bg-orange-100 rounded-full p-1"
                              title={`${
                                showDescription
                                  ? "Show Description"
                                  : "Hide Description"
                              } `}
                              onClick={() => toggleDescription(complaint._id)}
                            >
                              {showDescription[complaint._id] ? (
                                <HiChevronDoubleUp color="rgb(249, 115, 22)" />
                              ) : (
                                <HiChevronDoubleDown color="rgb(249, 115, 22)" />
                              )}
                            </button>
                          </div>

                          {/* Render description if showDescription[complaint._id] is true */}
                          {showDescription[complaint._id] && (
                            <div className="my-2">{complaint.description}</div>
                          )}
                        </td>
                        <td className="px-4 pt-2.5 align-top box-border">
                          <div className="flex justify-center items-center">
                            <button
                              className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors rounded-md px-3 py-1 border-2  ${
                                complaint.photos.length > 0
                                  ? "cursor-pointer hover:bg-gray-200"
                                  : "cursor-default"
                              }`}
                              title={` ${
                                complaint.photos.length > 0
                                  ? "View Attachments"
                                  : "No Attached Images"
                              }`}
                              onClick={
                                complaint.photos.length > 0
                                  ? () => openPhotoModal(complaint)
                                  : undefined // Set onClick to undefined when there are no photos
                              }
                            >
                              <IoCameraOutline
                                size={24}
                                color={`${
                                  complaint.photos.length > 0
                                    ? "#00e600"
                                    : "#ff3333"
                                }`}
                              />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 pt-3 align-top">
                          <div className="flex justify-center items-center">
                            <div className="grid grid-cols-3 gap-4 pointer-events-none">
                              <div className="flex justify-end w-24">
                                <div
                                  className={`inline-flex items-center rounded-full whitespace-nowrap border px-3 py-1.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    complaint.isApproved
                                      ? "bg-[#62cf62] text-white"
                                      : "bg-[#D9D9D9]"
                                  }`}
                                >
                                  {complaint.isApproved
                                    ? "Approved"
                                    : "Not Approved"}
                                </div>
                              </div>
                              <div className="flex justify-center w-24">
                                <div
                                  className={`inline-flex items-center rounded-full whitespace-nowrap border px-3 py-1.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    complaint.isAssigned
                                      ? "bg-[#62cf62] text-white"
                                      : "bg-[#D9D9D9]"
                                  }`}
                                >
                                  {complaint.isAssigned
                                    ? "Assigned"
                                    : "Not Assigned"}
                                </div>
                              </div>
                              <div className="flex justify-start w-24">
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
        <div className="relative overflow-auto w-full">
          <div className="flex flex-col justify-center items-center py-16 px-16">
            <div className="flex justify-between items-baseline mb-6 w-full">
              <h1 className="text-gray-600 font-palanquin text-3xl font-bold px-4">
                Completed Work Requests
              </h1>
            </div>
            {completedCopy.length == 0 && !loading ? (
              <div className="flex justify-end items-end w-full">
                <div className="flex justify-center items-center h-full w-full">
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 text-center w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mt-4">
                      No Completed Complaints
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                      Check back later for updates!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <table className="w-full caption-bottom text-sm border-2 border-gray-200 rounded-lg">
                  <thead className="border-b">
                    <tr className="border-b transition-colors bg-gray-100">
                      <th className="h-12 w-48 px-4 pe-20 text-center text-base align-middle font-medium">
                        Posted On
                      </th>
                      <th className="h-12 w-40 px-4 text-left align-middle font-medium">
                        Category
                      </th>
                      <th className="h-12 w-80 px-4 text-center text-base align-middle font-medium">
                        Subject & Description
                      </th>
                      <th className="h-12 w-40 px-4 text-center text-base align-middle font-medium">
                        Photos
                      </th>
                      <th className="h-12 w-72 px-4 text-center text-base align-middle font-medium">
                        Status
                      </th>
                      <th className="h-12 w-24 px-4 text-center align-middle font-medium">
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {completedCopy.map((complaint) => (
                      <tr
                        key={complaint._id}
                        className="border-b transition-colors hover:bg-[#FFFFF0] h-14"
                      >
                        <td className="px-8 pt-4 align-top">
                          {formatDate(complaint.createdAt)}
                        </td>
                        <td className="px-4 pt-4 align-top">
                          {complaint.issue}
                        </td>
                        <td className="px-4 pt-4 align-top">
                          <div className="flex justify-between items-center">
                            {complaint.subject}
                            <button
                              className="border-2 border-transparent hover:bg-orange-100 rounded-full p-1"
                              title={`${
                                showDescription
                                  ? "Show Description"
                                  : "Hide Description"
                              } `}
                              onClick={() => toggleDescription(complaint._id)}
                            >
                              {showDescription[complaint._id] ? (
                                <HiChevronDoubleUp color="rgb(249, 115, 22)" />
                              ) : (
                                <HiChevronDoubleDown color="rgb(249, 115, 22)" />
                              )}
                            </button>
                          </div>

                          {showDescription[complaint._id] && (
                            <div className="my-2">{complaint.description}</div>
                          )}
                        </td>
                        <td className="px-4 pt-2.5 align-top box-border">
                          <div className="flex justify-center items-center">
                            <button
                              className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors rounded-md px-3 py-1 border-2  ${
                                complaint.photos.length > 0
                                  ? "cursor-pointer hover:bg-gray-200"
                                  : "cursor-default"
                              }`}
                              title={` ${
                                complaint.photos.length > 0
                                  ? "View Attachments"
                                  : "No Attached Images"
                              }`}
                              onClick={
                                complaint.photos.length > 0
                                  ? () => openPhotoModal(complaint)
                                  : undefined // Set onClick to undefined when there are no photos
                              }
                            >
                              <IoCameraOutline
                                size={24}
                                color={`${
                                  complaint.photos.length > 0
                                    ? "#00e600"
                                    : "#ff3333"
                                }`}
                              />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 pt-3 align-top">
                          <div className="flex justify-center items-center">
                            {/* <div className="grid grid-cols-3 gap-4 pointer-events-none"> */}
                            {/* <div className="flex justify-end">
                                <div
                                  className={`inline-flex items-center rounded-full whitespace-nowrap border px-3 py-1.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    complaint.isApproved
                                      ? "bg-[#62cf62] text-white"
                                      : "bg-[#D9D9D9]"
                                  }`}
                                >
                                  {complaint.isApproved
                                    ? "Approved"
                                    : "Not Approved"}
                                </div>
                              </div> */}
                            {/* <div className="flex justify-center">
                                <div
                                  className={`inline-flex items-center rounded-full whitespace-nowrap border px-3 py-1.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    complaint.isAssigned
                                      ? "bg-[#62cf62] text-white"
                                      : "bg-[#D9D9D9]"
                                  }`}
                                >
                                  {complaint.isAssigned
                                    ? "Assigned"
                                    : "Not Assigned"}
                                </div>
                              </div> */}
                            <div className="flex justify-center">
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
                            {/* </div> */}
                          </div>
                        </td>
                        <td className="px-4 pt-4 align-top">
                          <div className="flex justify-center items-center">
                            <button
                              className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors rounded-md px-3 py-1 border-2  ${
                                complaint.feedback
                                  ? "cursor-default"
                                  : "cursor-pointer hover:bg-gray-200"
                              }`}
                              title={`${
                                complaint.feedback
                                  ? "Feedback Submitted"
                                  : "Give Feedback"
                              }`}
                              onClick={
                                !complaint.feedback
                                  ? () => openFeedbackModal(complaint)
                                  : undefined // Set onClick to undefined when there are no photos
                              }
                            >
                              <VscFeedback
                                color={`${
                                  complaint.feedback ? "green" : "red"
                                }`}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
      {isPhotoModalOpen && (
        <PhotoModal
          isOpen={isPhotoModalOpen}
          onRequestClose={closeModal}
          photos={selectedComplaint.photos}
        />
      )}
      {isFeedbackModalOpen && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onRequestClose={closeModal}
          complaintId={selectedComplaint._id}
        />
      )}
    </>
  );
};

export default PrevComplaints;
