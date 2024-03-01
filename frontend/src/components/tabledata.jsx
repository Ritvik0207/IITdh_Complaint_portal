/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import { Navbar2 } from "./components";
import axios from "axios";
import Navbar2 from "./navbar2";

const TableData = () => {
  const [complaints, setComplaints] = useState([]);

  const handleAssignClick = async (complaintId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/user/complaints/${complaintId}`);

      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== complaintId)
      );

      if (response.data.success) {
        console.log('Complaint marked as done');
      } else {
        console.log('Failed to mark complaint as done');
      }
    } catch (error) {
      console.error('Error marking complaint as done:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const response = await axios.get("http://localhost:5000/api/user/getcomplaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(response.data.complaints);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="flex flex-col pt-28 px-10">
        <h1 className="text-3xl font-bold mb-4 text-[#89288f] border-b pb-2">
          Welcome Admin
        </h1>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Roll Number
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Label
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Work Done
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(complaints) && complaints.map((complaint) => (
                    <tr
                      key={complaint._id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {complaint.rollNumber}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {complaint.issue}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
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
