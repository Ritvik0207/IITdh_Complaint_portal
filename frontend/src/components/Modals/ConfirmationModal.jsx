/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "auto",
    padding: "0px",
    // border: "none",
    borderRadius: "8px",
  },
};

Modal.setAppElement("#root");

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  complaintId,
  deleteComplaint,
  status,
}) => {
  const deleteClickHandler = () => {
    deleteComplaint(complaintId, status);
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >
      <div class="relative text-center bg-white border-transparent px-6 py-4 mx-4">
        <button
          type="button"
          class="text-gray-400 absolute top-2.5 -right-1.5 bg-transparent hover:bg-gray-200 hover:text-gray-600 rounded-lg text-sm p-1.5 inline-flex items-center focus:ring-2 focus:outline-none focus:ring-gray-200 focus:bg-gray-200 focus:text-gray-600"
          onClick={onRequestClose}
        >
          <FaTimes />
        </button>
        <div className="flex justify-center items-center py-2">
          <MdDeleteForever size={50} className="text-gray-600" />
        </div>
        <p class="mb-4 text-gray-500 font-palanquin font-semibold">
          Are you sure you want to delete this item?
        </p>
        {/* <p className="text-orange-500 font-normal text-sm font-palanquin mb-4 cursor-pointer">
          ComplaintID: {complaintId}
        </p> */}
        <div class="flex justify-center items-center space-x-4">
          <button
            type="button"
            class="py-2 px-3 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:ring-2 focus:outline-none focus:ring-gray-300"
            onClick={onRequestClose}
          >
            No, cancel
          </button>
          <button
            type="button"
            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-300"
            onClick={deleteClickHandler}
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
