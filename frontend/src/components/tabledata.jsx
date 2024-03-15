/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCamera, FaTimes } from "react-icons/fa"; // Import camera icon
import { toast } from "react-toastify";
import PhotoModal from "./Modals/PhotoModal";

const TableData = (props) => {
  const [complaints, setComplaints] = useState([]);
  const [approvedComplaints, setApprovedComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null); // To store the selected complaint
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility

  useEffect(() => {
    fetchData();
  }, [props.issue]);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const response = await axios.get(
        "http://localhost:5000/api/user/getcomplaintbycategory",
        {
          params: { issue: props.issue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(response.data.complaints);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle opening the modal and setting the selected complaint
  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateStatus = async (complaintId, isApproved) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const response = await axios.put(
        "http://localhost:5000/api/admin/updatestatus",
        { complaintId, isApproved },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        if (!isApproved) {
          // If complaint is rejected, delete it from the UI
          const updatedComplaints = complaints.filter((complaint) => complaint._id !== complaintId);
          toast.success(response.data.message);
          setComplaints(updatedComplaints);
        } else {
          // If complaint is approved, update its status
          const updatedComplaints = complaints.map((complaint) =>
            complaint._id === complaintId
              ? { ...complaint, isApproved } // Update the isApproved field of the matching complaint
              : complaint
          );
          toast.success(response.data.message);
          setComplaints(updatedComplaints);

          // Add the approved complaint to the approvedComplaints state
          const approvedComplaint = complaints.find((complaint) => complaint._id === complaintId);
          setApprovedComplaints([...approvedComplaints, approvedComplaint]);
        }
      } else {
        console.log("Failed to update complaint status");
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  const markAsDone = async (complaintId) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const response = await axios.put(
        "http://localhost:5000/api/admin/markasdone",
        { complaintId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Remove the complaint from approvedComplaints when marked as done
        const updatedApprovedComplaints = approvedComplaints.filter((complaint) => complaint._id !== complaintId);
        setApprovedComplaints(updatedApprovedComplaints);
        // Remove the complaint from complaints state to update the UI
        const updatedComplaints = complaints.filter((complaint) => complaint._id !== complaintId);
        setComplaints(updatedComplaints);
        toast.success(response.data.message);
      } else {
        console.log("Failed to mark complaint as done");
      }
    } catch (error) {
      console.error("Error marking complaint as done:", error);
    }
  };


  return (
    <div className="flex flex-col ps-5">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500 bg-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4 text-lg">
                    Roll Number
                  </th>
                  <th scope="col" className="px-6 py-4 text-lg">
                    Label
                  </th>
                  <th scope="col" className="px-6 py-4 text-lg">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4 text-lg">
                    Photos
                  </th>
                  <th scope="col" className="px-6 py-4 text-lg">
                    Upvotes
                  </th>
                  <th scope="col" className="px-6 py-4 text-lg">
                    Work Request
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(complaints) &&
                  complaints.map((complaint) => (
                    !complaint.isDone && (
                      <tr
                        key={complaint._id}
                        className="border-b dark:border-neutral-500 text-black"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium tracking-wider">
                          {complaint.rollNumber}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">
                          {complaint.issue}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">
                          {complaint.description}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg">
                          {complaint.photos.length > 0 ? (
                            <button
                              onClick={() => openModal(complaint)}
                              className="flex items-center justify-center text-blue-500 hover:text-blue-700"
                            >
                              <FaCamera className="mr-1" />
                              View Photos
                            </button>
                          ) : (
                            <div className="flex items-center">
                              <FaTimes className="text-red-500 mr-1" />
                              <span className="text-red-400">No photos</span>
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">
                          {complaint.upvoteCount}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          {!complaint.isApproved ? (
                            <>
                              <button
                                onClick={() => updateStatus(complaint._id, true)}
                                className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => updateStatus(complaint._id, false)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <div>
                              <span className="flex justify-center items-center text-green-600 h-full">
                                Approved
                              </span>
                              <button
                                onClick={() => markAsDone(complaint._id)}
                                className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                              >
                                Mark as Done
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    )
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Render the PhotoModal with the selected complaint */}
      {selectedComplaint && (
        <PhotoModal isOpen={isModalOpen} onRequestClose={closeModal} photos={selectedComplaint.photos} />
      )}
    </div>
  );
};

export default TableData;
