import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { MdOutlineFoodBank, MdElectricBolt } from "react-icons/md";
import { IoWater } from "react-icons/io5";
import { FaRegBell, FaRegBuilding, FaSearch } from "react-icons/fa";
import Table from "./table";

const SuperAdmin = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaintsCopy, setComplaintsCopy] = useState([]);
  const [issue, setIssue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("votes");
  const [descending, setDescending] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadingBar = useRef(null);

  const categories = [
    { name: "Food", icon: <MdOutlineFoodBank size={22} /> },
    { name: "Water", icon: <IoWater size={22} /> },
    { name: "Electricity", icon: <MdElectricBolt size={22} /> },
    {
      name: "Hostel_affairs",
      icon: <FaRegBuilding size={20} />,
      label: "Hostel Affairs",
    },
  ];

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter complaints based on roll number
    const filteredComplaints = complaints.filter((complaint) =>
      complaint.rollNumber.includes(term)
    );
    setComplaintsCopy(filteredComplaints);
  };

  //   const filteredComplaints = complaints.filter((content) =>
  //     content.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const toggleComplaintsOrder = () => {
    setDescending(!descending);
    setComplaintsCopy(complaintsCopy.sort().reverse());
  };

  const handleCategoryFilter = (issue) => {
    setIssue(issue);
  };

  useEffect(() => {
    fetchComplaints();
  }, [issue]);

  useEffect(() => {
    fetchComplaints();
  }, [filterBy, issue]);

  const fetchComplaints = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      setLoading(true);
      loadingBar.current.continuousStart();

      const response = await axios.get(
        "http://localhost:5000/api/user/getcomplaintbycategory",
        {
          params: { issue: issue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        const totalComplaints = response.data.complaints;

        let sortedComplaints;

        if (filterBy === "votes") {
          sortedComplaints = totalComplaints.sort(
            (a, b) => b.upvoteCount - a.upvoteCount
          );
        } else if (filterBy === "date") {
          sortedComplaints = totalComplaints.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (filterBy === "status") {
          sortedComplaints = totalComplaints.sort((a, b) => {
            const trueValuesA = [a.isApproved, a.isAssigned].filter(
              Boolean
            ).length;
            const trueValuesB = [b.isApproved, b.isAssigned].filter(
              Boolean
            ).length;
            return trueValuesB - trueValuesA;
          });
        }
        // console.log(sortedComplaints);
        setComplaintsCopy(sortedComplaints);
        setComplaints(totalComplaints);
        // setIsApproved()

        loadingBar.current.complete();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateStatus = async (complaintId, status) => {
    console.log(status);
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const response = await axios.put(
        "http://localhost:5000/api/admin/updatestatus",
        { complaintId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log(...[response.data.updatedComplaint]);
        const { isApproved, isAssigned, isDone, isRejected } =
          response.data.updatedComplaint;

        const updatedComplaints = complaintsCopy.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, isApproved, isAssigned, isDone, isRejected } // Update the fields of the matching complaint
            : complaint
        );
        setComplaintsCopy(updatedComplaints);
      } else {
        console.log("Failed to update complaint status");
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  return (
    <>
      <LoadingBar height={3} color="#f11946" ref={loadingBar} />
      <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
        <div className="border-r bg-gray-100 mt-16">
          <div className="flex flex-col h-full gap-2">
            <div className="flex h-16 items-center justify-between px-6 py-2 bg-gray-200">
              <h2 className="font-bold font-montserrat text-2xl tracking-wider px-2">
                IUHD
              </h2>
              <button
                className="inline-flex items-center justify-center text-sm font-medium  transition-colors focus-visible:ring-offset-2 border-2 hover:bg-gray-100 p-1.5 rounded-full hover:border-inset hover:border-orange-500 focus:ring-2 focus:ring-offset-0 focus:outline-none"
                title="Notifications"
              >
                <FaRegBell size={20} />
                {/* NOTIFICATIONS */}
              </button>
            </div>

            <div className="flex-1 py-2 bg-gray-100/40">
              <nav className="grid items-start px-4 font-medium gap-2.5">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-gray-200 ${
                      issue === category.name
                        ? "bg-gray-800 text-gray-50 hover:bg-gray-800"
                        : "text-gray-800 "
                    }`}
                    value={category.name}
                    onClick={() => handleCategoryFilter(category.name)}
                  >
                    {category.icon}
                    {category.label || category.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full mt-16 overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b bg-gray-100/40 px-6 py-2 gap-6">
            <div className="text-gray-600 font-palanquin text-2xl font-bold px-4 whitespace-nowrap">
              Complaints & Work Requests
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center relative">
                <label className="absolute left-1 px-2 py-2" htmlFor="search">
                  <FaSearch />
                </label>
                <input
                  type="search"
                  className="flex h-auto rounded-md border border-gray-400 px-3 py-2 text-sm pl-10 w-60 bg-gray-100 text-gray-700 outline-none focus-visible:ring-2 placeholder:italic placeholder-gray-500 "
                  value={searchTerm}
                  placeholder="Search complaints"
                  onChange={handleSearch}
                />
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="filter"
                  className="text-lg text-gray-600 mx-1 font-semibold whitespace-nowrap"
                >
                  Sort By :
                </label>
                <select
                  id="filter"
                  className="w-28 ms-2 appearance-none rounded-lg border border-gray-400 px-4 py-1.5 outline-none text-gray-700 font-semibold cursor-pointer focus-visible:ring-2"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="votes">Votes</option>
                  <option value="date">Date</option>
                  <option value="status">Status</option>
                </select>

                <button
                  className="ms-1.5 p-2 border border-gray-400 rounded-full hover:bg-gray-100 focus-visible:ring-2 outline-none"
                  value={descending}
                  title="Reverse sort direction"
                  onClick={toggleComplaintsOrder}
                >
                  {descending ? <FaArrowDown /> : <FaArrowUp />}
                </button>
              </div>
            </div>
          </header>

          <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-full w-full overflow-x-auto">
            {complaints.length == 0 && !loading ? (
              <div className="flex justify-center items-center h-full w-full">
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 text-center w-full">
                  <h2 className="text-xl font-semibold text-gray-800 mt-4">
                    No Pending Complaints
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    Select a category and check updates!
                  </p>
                </div>
              </div>
            ) : (
              <Table
                complaintsCopy={complaintsCopy}
                updateStatus={updateStatus}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default SuperAdmin;
