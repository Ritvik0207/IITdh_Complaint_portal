import React, { useState, useEffect } from "react";
import { HiChevronDoubleUp } from "react-icons/hi2";
import { IoCameraOutline } from "react-icons/io5";
import ConfirmationModal from "./Modals/ConfirmationModal";
import PhotoModal from "./Modals/PhotoModal";

const Table = ({ complaintsCopy, updateStatus }) => {
  const [showDescription, setShowDescription] = useState({});
  const [selectedComplaint, setSelectedComplaint] = useState(null); // To store the selected complaint
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

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

  return (
    <>
      <table className="w-full text-sm border-2 border-gray-200 border-collapse">
        <thead className="border-b">
          <tr className="bg-gray-100">
            <th className="h-12 w-32 text-center sm:text-base text-sm align-middle font-medium">
              Roll Number
            </th>
            <th className="h-12 w-36 text-center sm:text-base text-sm align-middle font-medium">
              Posted On
            </th>
            <th className="h-12 w-16 text-center sm:text-base text-sm align-middle font-medium">
              Upvotes
            </th>
            <th className="h-12 w-72 text-center sm:text-base text-sm align-middle font-medium">
              Subject & Description
            </th>
            <th className="h-12 w-20 text-center sm:text-base text-sm align-middle font-medium">
              Photos
            </th>
            <th className="h-12 w-76 text-center sm:text-base text-sm align-middle font-medium">
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

              <td className="pt-4 px-3 align-top">
                <div className="flex justify-between items-center gap-x-4">
                  <p className="line-clamp-1">{complaint.subject}</p>
                  <button
                    className="hover:bg-orange-100 rounded-full p-1 focus-visible:ring-1 outline-none"
                    title={`${
                      showDescription ? "Show Description" : "Hide Description"
                    } `}
                    onClick={() => toggleDescription(complaint._id)}
                  >
                    <HiChevronDoubleUp
                      className={`text-neworange transition-transform ${
                        showDescription[complaint._id]
                          ? "rotate-0"
                          : "rotate-180"
                      }`}
                    />
                  </button>
                </div>

                {/* Render description if showDescription[complaint._id] is true */}
                {showDescription[complaint._id] && (
                  <div className="my-2">{complaint.description}</div>
                )}
              </td>

              <td className="px-4 pt-2.5 align-top">
                <div className="flex justify-center items-center">
                  <button
                    className={`border-2 rounded-md px-3 py-1 outline-none ${
                      complaint.photos.length > 0
                        ? "cursor-pointer focus:ring-1 hover:bg-gray-100"
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
                        complaint.photos.length > 0 ? "#00e600" : "#ff3333"
                      }`}
                    />
                  </button>
                </div>
              </td>

              <td className="px-4 pt-3 align-top">
                <div className="grid grid-cols-4 gap-0 shrink-0">
                  <div className="flex justify-center">
                    <button
                      className={`rounded-full whitespace-nowrap border-2 border-transparent py-1.5 px-4 text-xs font-semibold transition-colors outline-none focus-visible:ring-2
                              ${
                                complaint.isApproved
                                  ? "border-newgreen border-2 bg-newgreen text-white"
                                  : "border-[#D9D9D9] hover:border-newgreen"
                              }
                              ${
                                complaint.isRejected
                                  ? "opacity-50 cursor-not-allowed bg-gray-200 hover:border-2 hover:border-[#D9D9D9]"
                                  : "border-[#D9D9D9] hover:border-2"
                              }`}
                      disabled={complaint.isApproved || complaint.isRejected}
                      onClick={() =>
                        updateStatus(complaint._id, "ApproveRequest")
                      }
                    >
                      {complaint.isApproved ? "Approved" : "Approve"}
                    </button>
                  </div>

                  <div className="flex justify-center w-24">
                    <button
                      className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-transparent py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center
                                        ${
                                          complaint.isAssigned
                                            ? "border-newgreen border-2 bg-newgreen text-white "
                                            : "border-[#D9D9D9] "
                                        }
                                        ${
                                          complaint.isApproved &&
                                          !complaint.isAssigned
                                            ? "border-2 hover:border-newgreen"
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
                        updateStatus(complaint._id, "AssignRequest")
                      }
                    >
                      {complaint.isAssigned ? "Assigned" : "Assign"}
                    </button>
                  </div>
                  <div className={`flex justify-center w-24`}>
                    <button
                      className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-transparent py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center
                                        ${
                                          complaint.isDone
                                            ? "border-newgreen border-2 bg-newgreen text-white"
                                            : "border-[#D9D9D9] "
                                        }
                                        ${
                                          complaint.isAssigned &&
                                          !complaint.isDone
                                            ? "border-2 hover:border-newgreen"
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
                      onClick={() => updateStatus(complaint._id, "DoneRequest")}
                    >
                      {complaint.isDone ? "Done" : "Mark as Done"}
                    </button>
                  </div>
                  <div className="flex justify-center w-24">
                    <button
                      className={`inline-flex items-center rounded-full whitespace-nowrap border-2 border-transparent py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 w-24 justify-center 
                                        ${
                                          !complaint.isApproved
                                            ? "bg-red-500/80 text-white cursor-pointer"
                                            : "bg-gray-300 text-gray-700"
                                        }`}
                      disabled={complaint.isApproved}
                      onClick={
                        complaint.isRejected
                          ? () => {
                              openConfirmationModal(complaint);
                            }
                          : () => updateStatus(complaint._id, "RejectRequest")
                      }
                    >
                      {complaint.isRejected ? "Delete" : "Reject"}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default Table;
