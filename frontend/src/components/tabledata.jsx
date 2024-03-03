/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const TableData = (props) => {
  const [complaints, setComplaints] = useState([]);

  const handleAssignClick = async (complaintId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/complaints/${complaintId}`
      );

      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== complaintId)
      );

      if (response.data.success) {
        console.log("Complaint marked as done");
      } else {
        console.log("Failed to mark complaint as done");
      }
    } catch (error) {
      console.error("Error marking complaint as done:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const response = await axios.get(
        "http://localhost:5000/api/user/getcomplaintbycategory",
        {
          params: { issue: props.issue }, // Sending issue as a query parameter
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

  return (
    <>
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
                      Work Done
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
                          <button
                            onClick={() => handleAssignClick(complaint._id)}
                            className="bg-green-500 text-white px-2 py-1 rounded-md"
                          >
                            Mark as Done
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableData;
