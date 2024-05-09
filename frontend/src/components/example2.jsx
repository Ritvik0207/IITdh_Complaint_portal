import React, { useState, useEffect } from "react";
import ConfirmationModal from "./Modals/ConfirmationModal";
import PhotoModal from "./Modals/PhotoModal";
import axios from "axios";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi2";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const Example2 = ({ activeSubLink, Tickets, links }) => {
  const [complaints, setComplaints] = useState([]);
  const [complaintsCopy, setComplaintsCopy] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("votes");
  const [descending, setDescending] = useState(true);
  const [showDescription, setShowDescription] = useState({});
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const fetchData = () => {
    let flattenedTickets;
    flattenedTickets = Tickets.flat();

    if (activeSubLink === links["Ticket"][0]) {
      let new_tickets = flattenedTickets.filter((complaint) => {
        return !complaint.isApproved && !complaint.isRejected;
      });
      setComplaintsCopy(new_tickets);
      setComplaints(new_tickets);
    }
    if (activeSubLink === links["Ticket"][1]) {
      let pending_tickets = flattenedTickets.filter((complaint) => {
        return complaint.isApproved && !complaint.isDone;
      });
      setComplaintsCopy(pending_tickets);
      setComplaints(pending_tickets);
    }
    if (activeSubLink === links["Ticket"][2]) {
      let resolved_tickets = flattenedTickets.filter((complaint) => {
        return complaint.isDone;
      });
      setComplaintsCopy(resolved_tickets);
      setComplaints(resolved_tickets);
    }
    if (activeSubLink === links["Ticket"][3]) {
      let rejected_tickets = flattenedTickets.filter((complaint) => {
        return complaint.isRejected;
      });
      setComplaintsCopy(rejected_tickets);
      setComplaints(rejected_tickets);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeSubLink]);

  const formatDate = (time) => {
    const date = new Date(time);
    let formattedTime = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedTime;
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Filter complaints based on roll number
    const filteredComplaints = complaints.filter((complaint) =>
      complaint.rollNumber.includes(term)
    );
    setComplaintsCopy(filteredComplaints);
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setFilterBy(filter);

    let sortedComplaints;
    if (filter === "votes") {
      sortedComplaints = complaints.sort(
        (a, b) => b.upvoteCount - a.upvoteCount
      );
    } else if (filter === "date") {
      sortedComplaints = complaints.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (filter === "status") {
      sortedComplaints = complaints.sort((a, b) => {
        const trueValuesA = [a.isApproved, a.isAssigned].filter(Boolean).length;
        const trueValuesB = [b.isApproved, b.isAssigned].filter(Boolean).length;
        return trueValuesB - trueValuesA;
      });
    }
    setComplaintsCopy(sortedComplaints);
  };

  const toggleComplaintsOrder = () => {
    setDescending(!descending);
    setComplaintsCopy(complaintsCopy.sort().reverse());
  };

  const toggleDescription = (complaintId) => {
    setShowDescription((prevOpenDescriptions) => {
      const updatedDescriptions = {};
      updatedDescriptions[complaintId] = !prevOpenDescriptions[complaintId];
      Object.keys(prevOpenDescriptions).forEach((id) => {
        if (id !== complaintId) {
          updatedDescriptions[id] = false;
        }
      });
      return updatedDescriptions;
    });
  };

  const openConfirmationModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsConfirmationModalOpen(true);
  };

  const openPhotoModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsPhotoModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setIsPhotoModalOpen(false);
    setIsConfirmationModalOpen(false);
  };

  const updateStatus = async (complaintId, status) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const response = await axios.put(
        "http://localhost:5000/api/admin/updatestatus",
        { complaintId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // console.log(...[response.data.updatedComplaint]);
        const { isApproved, isAssigned, isDone, isRejected } =
          response.data.updatedComplaint;

        const updatedComplaints = complaintsCopy.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, isApproved, isAssigned, isDone, isRejected } // Update the fields of the matching complaint
            : complaint
        );

        if (
          status === "ApproveRequest" ||
          status === "RejectRequest" ||
          status === "DoneRequest"
        ) {
          setComplaintsCopy(
            complaintsCopy.filter((c) => c._id !== complaintId)
          );
        } else {
          setComplaintsCopy(updatedComplaints);
        }
      } else {
        console.log("Failed to update complaint status");
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  return (
    <>
      <div className="grid h-full min-w-full">
        <div className="grid h-full w-full">
          <div className="flex h-full max-h-screen flex-col">
            <div className="flex flex-col h-full gap-2">
              <header className="flex h-16 items-center justify-between border-b-2 bg-gray-100/40 px-7 py-2 gap-6">
                <div className="w-full h-full flex justify-start items-center">
                  <div className="flex justify-start items-center text-gray-600 font-palanquin text-[25px] font-bold px-4 text-nowrap">
                    Complaints & Work Requests
                  </div>
                </div>
                <div className="flex justify-start items-center w-auto rounded-lg border-2 border-gray-300 relative">
                  <label className="absolute left-1 px-2 py-2" htmlFor="search">
                    <FaSearch />
                  </label>
                  <input
                    type="search"
                    className="flex h-auto px-3 py-2 text-sm pl-10 w-60 bg-gray-100 text-gray-500 font-semibold focus-visible:outline-none focus:ring-2 focus:ring-offset-0 focus:outline-none rounded-lg"
                    value={searchTerm}
                    placeholder="Search complaints"
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex justify-end items-end w-auto">
                  <div className="w-auto flex items-center justify-center box-border">
                    <label
                      htmlFor="filter"
                      className="text-lg text-gray-600 mx-1 ms-1 font-semibold w-auto text-nowrap"
                    >
                      Filter By :
                    </label>
                    <select
                      id="filter"
                      className="w-28 ms-2 appearance-none rounded-lg border-2 border-gray-400 px-4 py-1 shadow-sm focus:outline-none text-gray-500 font-semibold cursor-pointer focus:ring-2 focus:ring-offset-0"
                      value={filterBy}
                      onChange={handleFilterChange}
                    >
                      <option value="votes">Votes</option>
                      <option value="date">Date</option>
                      {activeSubLink === "Pending Tickets" && (
                        <option value="status">Status</option>
                      )}
                    </select>
                    <button
                      className="ms-1 p-2 border-2 border-gray-400 rounded-full hover:bg-gray-300/80 focus:ring-2 focus:ring-offset-0 focus:outline-none"
                      value={descending}
                      title="Reverse sort direction"
                      onClick={toggleComplaintsOrder}
                    >
                      {descending ? (
                        <FaArrowDown size={14} />
                      ) : (
                        <FaArrowUp size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </header>

              <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
                {complaintsCopy.length == 0 ? (
                  <div className="flex justify-center items-center h-full w-full">
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 text-center w-full h-full">
                      <h2 className="text-xl font-semibold text-gray-800 mt-4">
                        No {activeSubLink.split(" ")[0]} Complaints
                      </h2>
                      <p className="text-sm text-gray-600 mt-2">
                        Check later for updates!
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <table className="w-full h-auto caption-bottom text-sm border-2 border-gray-200 rounded-lg">
                      <thead className="border-b">
                        <tr className="border-b transition-colors bg-gray-100">
                          <th className="h-12 w-32 text-center text-base align-middle font-medium">
                            Roll Number
                          </th>
                          <th className="h-12 w-36 text-center text-base align-middle font-medium">
                            Posted On
                          </th>
                          <th className="h-12 w-16 text-center align-middle font-medium">
                            Upvotes
                          </th>
                          <th className="h-12 w-80 text-center text-base align-middle font-medium">
                            Subject & Description
                          </th>
                          <th className="h-12 w-20 text-center text-base align-middle font-medium">
                            Photos
                          </th>
                          <th className="h-12 w-76 text-center text-base align-middle font-medium">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="border-0">
                        {complaintsCopy.map((complaint, index) => (
                          <tr
                            key={complaint._id}
                            className="border-b transition-colors hover:bg-[#FFFFF0] h-14"
                          >
                            <td className="pt-4 align-top">
                              <div className="w-auto h-auto  flex justify-center">
                                {complaint.rollNumber}
                              </div>
                            </td>
                            <td className="pt-4 align-top">
                              <div className="w-auto h-auto  flex justify-center">
                                {formatDate(complaint.createdAt)}
                              </div>
                            </td>
                            <td className="pt-4 align-top">
                              <div className="w-auto h-auto  flex justify-center font-bold text-base">
                                {complaint.upvoteCount}
                              </div>
                            </td>
                            <td className="px-4 py-4 align-center">
                              <div className="flex justify-between items-center">
                                {complaint.subject}
                                <button
                                  className="border-2 border-transparent hover:bg-orange-100 rounded-full p-1 focus:ring-1 focus:outline-none"
                                  title={`${
                                    showDescription
                                      ? "Show Description"
                                      : "Hide Description"
                                  } `}
                                  onClick={() =>
                                    toggleDescription(complaint._id)
                                  }
                                >
                                  {showDescription[complaint._id] ? (
                                    <HiChevronDoubleUp color="rgb(249, 115, 22)" />
                                  ) : (
                                    <HiChevronDoubleDown color="rgb(249, 115, 22)" />
                                  )}
                                </button>
                              </div>

                              {showDescription[complaint._id] && (
                                <div className="my-2">
                                  {complaint.description}
                                </div>
                              )}
                            </td>
                            <td className="px-4 pt-2.5 align-top box-border">
                              <div className="flex justify-center items-center">
                                <button
                                  className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors rounded-md px-3 py-1 border-2 focus:outline-none ${
                                    complaint.photos.length > 0
                                      ? "cursor-pointer focus:ring-1 focus:ring-offset-0 hover:bg-gray-200"
                                      : "cursor-default"
                                  }`}
                                  title={` ${
                                    complaint.photos.length > 0
                                      ? "View Attachments"
                                      : "No Attached Images"
                                  }`}
                                  disabled={complaint.photos.length == 0}
                                  onClick={
                                    complaint.photos.length > 0
                                      ? () => openPhotoModal(complaint)
                                      : undefined
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
                              <div className="w-full h-full">
                                <div className="flex items-center justify-center">
                                  {complaint.isDone ? (
                                    <div className="flex justify-center w-24">
                                      <button
                                        className="inline-flex items-center rounded-full whitespace-nowrap py-1.5 px-4 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-auto justify-center border-[#62cf62] border-2 bg-[#62cf62] text-white"
                                        disabled={complaint.isDone}
                                      >
                                        Complaint Resolved
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      className={`grid gap-2 ${
                                        complaint.isApproved
                                          ? "grid-cols-3"
                                          : "grid-cols-4"
                                      }`}
                                    >
                                      <div className="flex justify-center w-24">
                                        <button
                                          className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-gray-200 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center
                                        ${
                                          complaint.isApproved
                                            ? "border-[#62cf62] border-2 bg-[#62cf62] text-white"
                                            : "border-[#D9D9D9] hover:border-[#62cf62]"
                                        }
                                        ${
                                          complaint.isRejected
                                            ? "opacity-50 cursor-not-allowed bg-[#d1d5d8] hover:border-2 hover:border-[#D9D9D9]"
                                            : "border-[#D9D9D9]"
                                        }`}
                                          disabled={
                                            complaint.isApproved ||
                                            complaint.isRejected
                                          }
                                          onClick={() =>
                                            updateStatus(
                                              complaint._id,
                                              "ApproveRequest"
                                            )
                                          }
                                        >
                                          {complaint.isApproved
                                            ? "Approved"
                                            : "Approve"}
                                        </button>
                                      </div>
                                      <div className="flex justify-center w-24">
                                        <button
                                          className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-gray-200 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center
                                        ${
                                          complaint.isAssigned
                                            ? "border-[#62cf62] border-2 bg-[#62cf62] text-white "
                                            : "border-[#D9D9D9] "
                                        }
                                        ${
                                          complaint.isApproved &&
                                          !complaint.isAssigned
                                            ? "border-2 hover:border-[#62cf62]"
                                            : ""
                                        }
                                        ${
                                          complaint.isRejected
                                            ? "opacity-50 cursor-not-allowed bg-[#d1d5d8] hover:border-2 hover:border-[#D9D9D9]"
                                            : "border-[#D9D9D9]"
                                        }`}
                                          disabled={
                                            !complaint.isApproved ||
                                            complaint.isAssigned ||
                                            complaint.isRejected
                                          }
                                          onClick={() =>
                                            updateStatus(
                                              complaint._id,
                                              "AssignRequest"
                                            )
                                          }
                                        >
                                          {complaint.isAssigned
                                            ? "Assigned"
                                            : "Assign"}
                                        </button>
                                      </div>
                                      <div
                                        className={`flex justify-center w-24`}
                                      >
                                        <button
                                          className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-gray-200 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center
                                        ${
                                          complaint.isDone
                                            ? "border-[#62cf62] border-2 bg-[#62cf62] text-white"
                                            : "border-[#D9D9D9] "
                                        }
                                        ${
                                          complaint.isAssigned &&
                                          !complaint.isDone
                                            ? "border-2 hover:border-[#62cf62]"
                                            : ""
                                        }
                                        ${
                                          complaint.isRejected
                                            ? "opacity-50 cursor-not-allowed bg-[#d1d5d8] hover:border-2 hover:border-[#D9D9D9]"
                                            : "border-[#D9D9D9]"
                                        }`}
                                          disabled={
                                            !complaint.isApproved ||
                                            !complaint.isAssigned ||
                                            complaint.isDone
                                          }
                                          onClick={() =>
                                            updateStatus(
                                              complaint._id,
                                              "DoneRequest"
                                            )
                                          }
                                        >
                                          {complaint.isDone
                                            ? "Done"
                                            : "Mark as Done"}
                                        </button>
                                      </div>
                                      {!complaint.isApproved && (
                                        <div className="flex justify-center w-24">
                                          <button
                                            className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-gray-200 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center 
                                        ${
                                          !complaint.isApproved
                                            ? "bg-red-500 hover:border-red-500/80 text-white cursor-pointer"
                                            : "bg-gray-300 text-gray-700"
                                        }`}
                                            disabled={complaint.isApproved}
                                            onClick={
                                              complaint.isRejected
                                                ? () => {
                                                    openConfirmationModal(
                                                      complaint
                                                    );
                                                  }
                                                : () => {
                                                    updateStatus(
                                                      complaint._id,
                                                      "RejectRequest"
                                                    );
                                                  }
                                            }
                                          >
                                            {complaint.isRejected
                                              ? "Delete"
                                              : "Reject"}
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </main>
            </div>
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
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onRequestClose={closeModal}
          complaintId={selectedComplaint._id}
          deleteComplaint={updateStatus}
          status={"DeleteRequest"}
        />
      )}
    </>
  );
};

export default Example2;
