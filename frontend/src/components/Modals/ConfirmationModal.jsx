/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "auto",
    padding: "10px",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  complaintId,
  deleteComplaint,
}) => {
  const deleteClickHandler = () => {
    deleteComplaint(complaintId);
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >
      <div className="max-h-full max-w-full overflow-auto">
        <div className="flex justify-center items-center relative pt-4">
          <button
            onClick={onRequestClose}
            className="px-2 py-1 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 focus:outline-none absolute right-0 top-0"
          >
            <FaTimes />
          </button>
          <div className="w-full h-full">
            <div className="flex flex-col justify-start py-4 px-4 gap-4">
              <p className="text-xl">
                Are you sure you want to delete this complaint?{" "}
              </p>
              <span className="text-orange-500 font-semibold">
                ComplaintID: {complaintId}
              </span>
              <div className="flex justify-center items-center gap-4">
                <button
                  className="px-4 py-2 bg-[#ff4d4d] text-white rounded hover:bg-[#ff3333]"
                  onClick={deleteClickHandler}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={onRequestClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
