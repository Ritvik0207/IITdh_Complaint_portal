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
    width: "60%",
    height: "40%",
    padding: "10px",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const PhotoModal = ({ isOpen, onRequestClose, photos }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Photo Modal"
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
    </Modal>
  );
};

export default PhotoModal;
