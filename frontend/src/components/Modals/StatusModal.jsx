/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { LuCheckCircle } from "react-icons/lu";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
    padding: "10px",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const StatusModal = ({
  isOpen,
  onRequestClose,
  photos,
  complaintId,
  complaintData,
  time,
  loading,
}) => {
  const isApproved = complaintData.isApproved;
  const isAssigned = complaintData.isAssigned;
  const isDone = complaintData.isDone;
  // console.log(isApproved, isAssigned, isDone);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Complaint Status Modal"
    >
      <div className="max-h-full max-w-full overflow-auto">
        <div className="flex justify-center items-center relative py-4">
          <div className="flex justify-center items-center">
            <h2 className=" text-2xl text-orange-400 font-bold font-palanquin">
              Photos related to the complaint
            </h2>
          </div>

          <button
            onClick={onRequestClose}
            className="px-2 py-1 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 focus:outline-none absolute right-0 top-0"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-3 mb-4">
          {photos.map((photo, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={`http://localhost:5000/uploads/${photo}`}
                alt={`Complaint Photo ${index + 1}`}
                className="object-contain max-w-full max-h-full rounded-lg"
                style={{ maxWidth: "10rem", maxHeight: "10rem" }} // Adjusted image size
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-10">
        <div className="grid grid-rows-2 space-y-2">
          <div className="flex items-center font-semibold font-montserrat text-base text-gray-700">
            Complaint ID:{" "}
            <div className="ps-2 font-normal text-gray-500">{complaintId}</div>
          </div>
          <div>
            <div className="flex items-center font-semibold font-montserrat text-base text-gray-700">
              Posted On:{" "}
              <div className="ps-2 font-normal text-gray-500">{time}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-center w-full h-auto">
            <div className="text-center text-lg font-semibold text-gray-700 font-palanquin pb-3">
              Complaint Status
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex items-center justify-center relative pe-16 pb-2">
              <div className="flex flex-col justify-center items-center">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10 ${
                    isApproved ? "bg-[#33cc33]" : "bg-[#D9D9D9]"
                  }`}
                >
                  {isApproved ? (
                    <LuCheckCircle size={22} />
                  ) : (
                    <MdOutlineCancel size={26} color="#ff6666" />
                  )}
                </div>
                <div className="w-24 h-10 overflow-hidden text-center">
                  <h2 className="font-medium text-[12px] text-gray-900 tracking-tight">
                    {isApproved ? "Approved" : "Waiting for approval"}
                  </h2>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="w-full h-10 ms-10 absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-gray-200"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center relative pe-16 pb-2">
              <div className="flex flex-col justify-center items-center">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10 ${
                    isAssigned ? "bg-[#33cc33]" : "bg-[#D9D9D9]"
                  }`}
                >
                  {isAssigned ? (
                    <LuCheckCircle size={22} />
                  ) : (
                    <MdOutlineCancel size={26} color="#ff6666" />
                  )}
                </div>
                <div className="w-24 h-10 overflow-hidden text-center">
                  <h2 className="font-medium text-[12px] text-gray-900 tracking-tight text-sm">
                    {isAssigned ? "Assigned" : "Waiting to be assigned"}
                  </h2>
                </div>
              </div>
              <div className="w-full h-10 ms-10 absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-gray-200"></div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center relative pb-2">
              <div className="flex flex-col justify-center items-center">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10 ${
                    isDone ? "bg-[#33cc33]" : "bg-[#D9D9D9]"
                  }`}
                >
                  {isDone ? (
                    <LuCheckCircle size={22} />
                  ) : (
                    <MdOutlineCancel size={26} color="#ff6666" />
                  )}
                </div>
                <div className="w-24 h-10 overflow-hidden text-center">
                  <h2 className="font-medium text-[12px] text-gray-900 tracking-tight text-sm">
                    {isDone ? "Work Done" : "Work is in progress"}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StatusModal;
