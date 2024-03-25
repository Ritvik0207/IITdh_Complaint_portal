/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "../components/categories";
import TableData from "../components/tabledata";
import Majorissues from "../components/majorissues";
import { Link } from "react-router-dom";
// import Details from "../components/details";
import Adminview from "../components/adminview";
// import { set } from "mongoose";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCatSelected, setCatSelected] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [complaintsCopy, setComplaintsCopy] = useState([]);
  const [issue, setIssue] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [totalComplaintsCount, setTotalComplaintsCount] = useState(0);
  const [approvedComplaintsCount, setApprovedComplaintsCount] = useState(0);
  const [pendingComplaintsCount, setPendingComplaintsCount] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  const handleCategoryFilter = (issue) => {
    setSelectedIssue(issue);
    if (issue === "All") {
      setComplaintsCopy(complaints);
    } else {
      let filteredComplaints = complaints.filter(
        (complaint) => complaint.issue === issue
      );
      setFilteredComplaints(filteredComplaints);
      setComplaintsCopy(filteredComplaints);
    }
  };

  // useEffect(() => {
  //   console.log("filter in effect:" + filteredComplaints);
  //   // setComplaintsCopy(filteredComplaints);
  //   console.log(complaintsCopy);
  // }, [selectedIssue]);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const response = await axios.get(
        "http://localhost:5000/api/user/getcomplaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Sort complaints by upvote count in descending order
        const sortedComplaints = response.data.complaints.sort(
          (a, b) => b.upvoteCount - a.upvoteCount
        );
        setComplaints(sortedComplaints);
        setComplaintsCopy(sortedComplaints);
      } else {
        throw new Error("Failed to fetch complaints");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // for user details
    if (userInfo && userInfo.isAdmin) {
      setIsAdmin(true);
      fetchData();
    } else {
      setIsAdmin(false);
      fetchData();
    }
  }, []);

  useEffect(() => {
    // Calculate complaint counts
    const totalComplaintsCount = complaints.length;
    const approvedComplaintsCount = complaints.filter(
      (complaint) => complaint.isApproved
    ).length;
    const pendingComplaintsCount = complaints.filter(
      (complaint) => !complaint.isApproved && !complaint.isDone
    ).length;

    // Pass complaint counts to Adminview
    setTotalComplaintsCount(totalComplaintsCount);
    setApprovedComplaintsCount(approvedComplaintsCount);
    setPendingComplaintsCount(pendingComplaintsCount);
  }, [complaints]);

  return (
    <>
      {isAdmin ? (
        <div className="flex flex-col pt-28 px-10 min-h-screen">
          <h1 className="text-3xl font-bold mb-8 pb-2 text-[#89288f] border-b-gray-400 border-b-2">
            Welcome Admin
          </h1>
          <div className="flex flex-row max-sm:flex-col h-full">
            <div className="flex flex-col mt-10 w-1/4 ">
              <Categories
                name="Food related issues"
                issue="Food"
                fun={(issue) => {
                  setCatSelected(true);
                  setIssue(issue);
                }}
              />
              <Categories
                name="Water related issues"
                issue="Water"
                fun={(issue) => {
                  setCatSelected(true);
                  setIssue(issue);
                }}
              />
              <Categories
                name="Electricity related issues"
                issue="Electricity"
                fun={(issue) => {
                  setCatSelected(true);
                  setIssue(issue);
                }}
              />
              <Categories
                name="Hostel Affaires"
                issue="Hostel_affairs"
                fun={(issue) => {
                  setCatSelected(true);
                  setIssue(issue);
                }}
              />
            </div>
            <div className=" flex flex-1 justify-center items-center ps-10">
              {isCatSelected ? (
                <TableData issue={issue} />
              ) : (
                <Adminview
                  totalComplaintsCount={totalComplaintsCount}
                  approvedComplaintsCount={approvedComplaintsCount}
                  pendingComplaintsCount={pendingComplaintsCount}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <section className="text-gray-600 overflow-hidden w-full lg:w-3/4">
            <div className="container px-10 py-24 mx-auto">
              <div className="flex justify-between items-baseline">
                <h1 className="text-gray-600 font-palanquin text-3xl font-bold px-4">
                  Complaint Dashboard
                </h1>
                <div className="flex justify-center me-6">
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button
                      className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors"
                      onClick={() => {
                        handleCategoryFilter("Food");
                      }}
                    >
                      <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                        Food
                      </div>
                    </button>
                    <button
                      className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors"
                      onClick={() => {
                        handleCategoryFilter("Water");
                      }}
                    >
                      <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                        Water
                      </div>
                    </button>
                    <button
                      className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors"
                      onClick={() => {
                        handleCategoryFilter("Electricity");
                      }}
                    >
                      <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                        Electricity
                      </div>
                    </button>
                    <button
                      className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors"
                      onClick={() => {
                        handleCategoryFilter("All");
                      }}
                    >
                      <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                        All
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="m-4">
                {complaintsCopy.map((complaint) => (
                  <Majorissues
                    key={complaint._id}
                    timestamp={new Date(complaint.createdAt).toLocaleString()}
                    issue={complaint.issue}
                    subject={complaint.subject}
                    description={complaint.description}
                    upvoteCount={complaint.upvoteCount}
                    complaintId={complaint._id}
                    upvotedBy={complaint.upvotedBy}
                    photos={complaint.photos}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="text-orange-500 body-font w-full lg:w-1/4 pt-28">
            <div className="w-full p-1 flex items-center justify-start box-border mb-16 pe-10">
              <label
                htmlFor="filter"
                className="text-xl text-gray-600 mx-1 ms-1 tracking-wider font-semibold w-auto text-nowrap"
              >
                Filter By :
              </label>
              <select
                id="filter"
                className="w-full ms-2 appearance-none rounded-lg border border-gray-400 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none text-gray-500"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="votes">Votes</option>
                <option value="date">Date</option>
              </select>
            </div>

            <div className=" font-medium text-xl px-2 py-3 cursor-default mt-20">
              Complaint Status & New Complaints ?
            </div>
            <div className="container px-5 py-3 mx-auto">
              <div className="px-2 w-full">
                <Link
                  className="h-full flex items-center border-newpurple border-2 p-4 rounded-lg text-gray-900 title-font font-medium"
                  to="/complaint"
                >
                  Register a Complaint
                </Link>
              </div>
            </div>
            <div className="container px-5 py-3 mx-auto">
              <div className="px-2 w-full">
                <Link
                  className="h-full flex items-center border-newpurple border-2 p-4 rounded-lg text-gray-900 title-font font-medium"
                  to="/prevcomplaints"
                >
                  View Previous Complaints
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Dashboard;
