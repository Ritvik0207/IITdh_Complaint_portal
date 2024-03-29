import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi2";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { MdOutlineFoodBank } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import {
  FaRegBell,
  FaRegBuilding,
  FaSearch,
  FaChevronRight,
} from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import PhotoModal from "./Modals/PhotoModal";
import ConfirmationModal from "./Modals/ConfirmationModal";
import { toast } from "react-toastify";

const Example = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaintsCopy, setComplaintsCopy] = useState([]);
  const [approvedComplaints, setApprovedComplaints] = useState([]);
  const [issue, setIssue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("votes");
  const [descending, setDescending] = useState(true);
  const [showDescription, setShowDescription] = useState({});
  const [selectedComplaint, setSelectedComplaint] = useState(null); // To store the selected complaint
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingBar = useRef(null);

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
    const filtered = complaints.filter((complaint) =>
      complaint.rollNumber.includes(term)
    );
    setComplaintsCopy(filtered);
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

  const toggleComplaintsOrder = () => {
    setDescending(!descending);
    setComplaintsCopy(complaintsCopy.sort().reverse());
  };

  const handleCategoryFilter = (issue) => {
    setIssue(issue);
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

  useEffect(() => {
    fetchComplaints();
  }, [issue]);

  useEffect(() => {
    fetchComplaints();
  }, [filterBy, issue]);

  const fetchComplaints = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      setLoading(true);
      loadingBar.current.continuousStart();

      const response = await axios.get(
        "http://localhost:5000/api/user/getcomplaintbycategory",
        {
          params: { issue: issue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        const totalComplaints = response.data.complaints;

        let sortedComplaints;

        if (filterBy === "votes") {
          sortedComplaints = totalComplaints.sort(
            (a, b) => b.upvoteCount - a.upvoteCount
          );
        } else if (filterBy === "date") {
          sortedComplaints = totalComplaints.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (filterBy === "status") {
          sortedComplaints = totalComplaints.sort((a, b) => {
            const trueValuesA = [a.isApproved, a.isAssigned].filter(
              Boolean
            ).length;
            const trueValuesB = [b.isApproved, b.isAssigned].filter(
              Boolean
            ).length;
            return trueValuesB - trueValuesA;
          });
        }
        // console.log(sortedComplaints);
        setComplaintsCopy(sortedComplaints);
        setComplaints(totalComplaints);
        // setIsApproved()

        loadingBar.current.complete();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateStatus = async (complaintId, status) => {
    console.log(status);
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
        console.log(...[response.data.updatedComplaint]);
        const { isApproved, isAssigned, isDone, isRejected } =
          response.data.updatedComplaint;

        const updatedComplaints = complaintsCopy.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, isApproved, isAssigned, isDone, isRejected } // Update the fields of the matching complaint
            : complaint
        );
        setComplaintsCopy(updatedComplaints);
      } else {
        console.log("Failed to update complaint status");
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  return (
    <>
      <LoadingBar height={3} color="#f11946" ref={loadingBar} />
      <div className="grid min-h-screen min-w-full lg:grid-cols-[280px_1fr]">
        <div className="border-r bg-gray-100/40 ">
          <div className="flex h-full max-h-screen flex-col">
            <div className="flex flex-col h-full pt-16 gap-2">
              <div className="flex h-16 items-center justify-between border-b px-6 mt-3 py-2 bg-gray-200">
                <h2 className="font-bold font-montserrat text-2xl tracking-wider px-2">
                  IUHD
                </h2>
                <button
                  className="inline-flex items-center justify-center text-sm font-medium  transition-colors focus-visible:ring-offset-2 border-2 hover:bg-gray-100 p-1.5 rounded-full hover:border-inset hover:border-orange-500 focus:ring-2 focus:ring-offset-0 focus:outline-none"
                  title="Notifications"
                >
                  <FaRegBell size={20} />
                  {/* NOTIFICATIONS */}
                </button>
              </div>
              <div className="h-auto box-border py-2">
                <nav className="grid items-start px-4 text-base font-medium gap-2">
                  <button
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-gray-800 transition-all border-2 border-transparent hover:border-2 hover:bg-gray-200 hover:border-transparent ${
                      issue === "Food"
                        ? "bg-gray-800 text-gray-100 hover:bg-gray-800"
                        : ""
                    }`}
                    value={"Food"}
                    onClick={() => {
                      handleCategoryFilter("Food");
                    }}
                  >
                    <MdOutlineFoodBank size={22} />
                    Food
                  </button>
                  <button
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-gray-800 transition-all border-2 border-transparent hover:border-2 hover:bg-gray-200 hover:border-transparent ${
                      issue === "Water"
                        ? "bg-gray-800 text-gray-100 hover:bg-gray-800"
                        : ""
                    }`}
                    value={"Water"}
                    onClick={() => {
                      handleCategoryFilter("Water");
                    }}
                  >
                    <IoWater size={22} />
                    Water
                  </button>
                  <button
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-gray-800 transition-all border-2 border-transparent hover:border-2 hover:bg-gray-200 hover:border-transparent ${
                      issue === "Electricity"
                        ? "bg-gray-800 text-gray-100 hover:bg-gray-800"
                        : ""
                    }`}
                    value={"Electricity"}
                    onClick={() => {
                      handleCategoryFilter("Electricity");
                    }}
                  >
                    <MdElectricBolt size={22} />
                    Electricity
                  </button>
                  <button
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-gray-800 transition-all border-2 border-transparent hover:border-2 hover:bg-gray-200 hover:border-transparent ${
                      issue === "Hostel_affairs"
                        ? "bg-gray-800 text-gray-100 hover:bg-gray-800"
                        : ""
                    }`}
                    value={"Hostel_affairs"}
                    onClick={() => {
                      handleCategoryFilter("Hostel_affairs");
                    }}
                  >
                    <FaRegBuilding size={20} />
                    Hostel Affairs
                  </button>
                </nav>
              </div>
              <div className="p-4 pt-16 h-auto flex items-end">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-between items-center px-2 py-4">
                    <div className="text-base font-medium">
                      Total Complaints
                    </div>
                    <div className="text-base font-medium pe-4">0</div>
                  </div>
                  <div className="flex justify-between items-center px-2 py-4">
                    <div className="text-base font-medium">
                      Approved Complaints
                    </div>
                    <div className="text-base font-medium pe-4">0</div>
                  </div>
                  <div className="flex justify-between items-center px-2 py-4">
                    <div className="text-base font-medium">
                      Pending Complaints
                    </div>
                    <div className="text-base font-medium pe-4">0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid min-h-screen w-full">
          <div className="flex h-full max-h-screen flex-col">
            <div className="flex flex-col h-full pt-16 gap-2">
              <header className="flex h-16 items-center justify-between border-b bg-gray-100/40 px-6 mt-3 py-2 gap-6">
                <div className="w-full h-full flex justify-start items-center">
                  <div className="flex justify-start items-center text-gray-600 font-palanquin text-2xl font-bold px-4 text-nowrap">
                    Complaints & Work Requests
                  </div>
                </div>
                <div className="flex justify-end items-center w-auto relative">
                  <label className="absolute left-1 px-2 py-2" htmlFor="search">
                    <FaSearch />
                  </label>
                  <input
                    type="search"
                    className="flex h-auto rounded-md border border-input px-3 py-2 text-sm pl-10 w-60 bg-gray-100 text-gray-700 focus-visible:outline-none focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    value={searchTerm}
                    placeholder="Search complaints"
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex justify-end items-end w-auto">
                  <div className="w-auto flex items-center justify-center box-border">
                    <label
                      htmlFor="filter"
                      className="text-xl text-gray-600 mx-1 ms-1 font-semibold w-auto text-nowrap"
                    >
                      Filter By :
                    </label>
                    <select
                      id="filter"
                      className="w-28 ms-2 appearance-none rounded-lg border-2 border-gray-400 px-4 py-1 shadow-sm focus:outline-none text-gray-500 font-semibold cursor-pointer focus:ring-2 focus:ring-offset-0"
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                    >
                      <option value="votes">Votes</option>
                      <option value="date">Date</option>
                      <option value="status">Status</option>
                    </select>
                    <button
                      className="ms-1 p-2 border-2 border-gray-100 rounded-xl hover:bg-gray-100 focus:ring-2 focus:ring-offset-0 focus:outline-none"
                      value={descending}
                      title="Reverse sort direction"
                      onClick={toggleComplaintsOrder}
                    >
                      {descending ? <FaArrowDown /> : <FaArrowUp />}
                    </button>
                  </div>
                </div>
                {/* </div> */}
              </header>
              <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="flex justify-start items-center gap-2 text-base w-auto px-2 ">
                  <Link className="flex justify-start items-center gap-2 px-2 py-1 text-gray-600 hover:text-orange-500 transition-all rounded-md">
                    <FaChevronRight />
                    Back to posts
                  </Link>
                </div>
                {complaints.length == 0 && !loading ? (
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
                          {/* <th className="h-12 w-12 text-center text-base align-middle font-medium"></th> */}
                        </tr>
                      </thead>
                      <tbody className="border-0">
                        {complaintsCopy.map((complaint) => (
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
                            <td className="px-4 py-2 align-center">
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

                              {/* Render description if showDescription[complaint._id] is true */}
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
                                  <div className="grid grid-cols-4 gap-2">
                                    <div className="flex justify-center w-24">
                                      <button
                                        className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-transparent py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center
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
                                        className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-transparent py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center
                                        ${
                                          complaint.isAssigned
                                            ? "border-[#62cf62] border-2 bg-[#62cf62] text-white "
                                            : "border-[#D9D9D9] "
                                        }
                                        ${
                                          complaint.isApproved
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
                                    <div className={`flex justify-center w-24`}>
                                      <button
                                        className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-transparent py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center
                                        ${
                                          complaint.isDone
                                            ? "border-[#62cf62] border-2 bg-[#62cf62] text-white"
                                            : "border-[#D9D9D9] "
                                        }
                                        ${
                                          complaint.isAssigned
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
                                    <div className="flex justify-center w-24">
                                      <button
                                        className={`inline-flex items-center rounded-full whitespace-nowrap border py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center 
                                        ${
                                          !complaint.isApproved
                                            ? "bg-red-500/80 text-white cursor-pointer"
                                            : "bg-gray-300 text-gray-700"
                                        }
                                        `}
                                        disabled={complaint.isApproved}
                                        onClick={
                                          complaint.isRejected
                                            ? () => {
                                                openConfirmationModal(
                                                  complaint
                                                );
                                              }
                                            : () =>
                                                updateStatus(
                                                  complaint._id,
                                                  "RejectRequest"
                                                )
                                        }
                                      >
                                        {complaint.isRejected
                                          ? "Delete"
                                          : "Reject"}
                                      </button>
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

export default Example;
