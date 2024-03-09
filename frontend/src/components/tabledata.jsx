/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TableData = (props) => {
  const [complaints, setComplaints] = useState([]);

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
        }
      } else {
        console.log("Failed to update complaint status");
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
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
                    Work Request
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(complaints) &&
                  complaints.map((complaint) => (
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
                          <span className="flex justify-center items-center text-green-600 h-full">
                            Approved
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableData;
