/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa"; // Import close icon

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "75%", // Increased width to cover 75% of the screen
        height: "75%", // Increased height to cover 75% of the screen
        padding: "20px", // Added padding
        borderRadius: "10px", // Added border radius
    },
};

const PhotoModal = ({ isOpen, onRequestClose, photos }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Photo Modal"
        >
            <div className="flex justify-end">
                <button
                    onClick={onRequestClose}
                    className="px-2 py-1 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 focus:outline-none"
                >
                    <FaTimes />
                </button>
            </div>
            <div className="text-center">
                <h2 className="mb-4 text-xl font-bold">Photos</h2>
                <div className="grid grid-cols-2 gap-4">
                    {photos.map((photo, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <img
                                src={`http://localhost:5000/uploads/${photo}`}
                                alt={`Complaint Photo ${index + 1}`}
                                className="object-contain max-w-full max-h-full rounded-lg" // Set maximum width and height
                                style={{ maxWidth: "20rem", maxHeight: "20rem" }} // Adjusted image size
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default PhotoModal;



