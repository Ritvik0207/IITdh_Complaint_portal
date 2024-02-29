import {React, useState, useEffect} from "react";
import { Navbar2 } from "./components";
import axios from "axios";

const TableData = () => {
  const data = [
    { id: 1, className: "Default", heading1: "Cell", heading2: "Cell" },
    // Add more data as needed
  ];
  
  const [complaints, setComplaints] = useState([]);

  const handleAssignClick = async (complaintId) => {
    try {
      // Send a DELETE request to the server
      const response = await axios.delete(`http://localhost:3000/admin/complaints/${complaintId}`);
      
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint.id !== complaintId)
      );
      
      if (response.data.success) {
        // Handle success (optional)
        console.log('Complaint marked as done');
      } else {
        // Handle failure (optional)
        console.log('Failed to mark complaint as done');
      }
    } catch (error) {
      // Handle error (optional)
      console.error('Error marking complaint as done:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/complaintsList");
      const data = await response.json();
      console.log(data);
      setComplaints(data);
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
                  {complaints.map((complaint) => (
                    <tr
                      key={complaint.id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {complaint.created_by}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {complaint.label}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {complaint.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() => handleAssignClick(complaint.id)}
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
