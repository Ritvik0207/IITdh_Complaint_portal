/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCamera, FaTimes } from "react-icons/fa"; // Import camera and times icons
import PhotoModal from "../components/Modals/PhotoModal";

const PrevComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("userInfo")).token;

                const response = await axios.get(
                    "http://localhost:5000/api/user/usercomplaints",
                    {
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

        fetchData();
    }, []);

    const openModal = (complaint) => {
        setSelectedComplaint(complaint);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedComplaint(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container px-5 py-3 mx-auto">
            <h1 className="text-3xl font-semibold mb-4 mt-2">Your Complaints</h1>
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
                                        Is Assigned
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-lg">
                                        Status
                                    </th>
                                    {/* {complaints.some(complaint => complaint.isApproved) && (
                                        <th scope="col" className="px-6 py-4 text-lg">
                                            Completion
                                        </th>
                                    )} */}
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.map(complaint => (
                                    <tr key={complaint._id} className="border-b dark:border-neutral-500 text-black">
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
                                                <FaCamera className="text-green-500 cursor-pointer" onClick={() => openModal(complaint)} />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </td>
                                        <td className={`whitespace-nowrap px-6 py-4 ${complaint.isApproved ? 'text-green-500' : 'text-red-500'}`}>
                                            {complaint.isApproved ? "Approved" : "Pending"}
                                        </td>
                                        {complaint.isApproved && (
                                            <td className={`whitespace-nowrap px-6 py-4 ${complaint.isDone ? 'text-green-500' : 'text-yellow-500'}`}>
                                                {complaint.isDone ? "Work Done" : "In Progress"}
                                            </td>
                                        )}
                                    </tr>
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
}

export default PrevComplaints;
