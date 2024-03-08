/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "../components/categories";
import TableData from "../components/tabledata";
import Majorissues from "../components/majorissues";
import { Link } from "react-router-dom";
import Details from "../components/details";
import Adminview from "../components/adminview";
import { set } from "mongoose";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCatSelected, setCatSelected] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [issue, setIssue] = useState("");
  const [totalComplaintsCount, setTotalComplaintsCount] = useState(0);
  const [approvedComplaintsCount, setApprovedComplaintsCount] = useState(0);
  const [pendingComplaintsCount, setPendingComplaintsCount] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/complaint");
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // for user details
    if (userInfo && userInfo.isAdmin) {
      setIsAdmin(true);
      fetchData();
    } else {
      fetchData();
    }
  }, []);

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
        setComplaints(response.data.complaints);
      } else {
        throw new Error("Failed to fetch complaints");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Calculate complaint counts
    const totalComplaintsCount = complaints.length;
    const approvedComplaintsCount = complaints.filter(complaint => complaint.isApproved).length;
    const pendingComplaintsCount = complaints.filter(complaint => !complaint.isApproved && !complaint.isDone).length;

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
              {isCatSelected ? <TableData issue={issue} /> : <Adminview
                totalComplaintsCount={totalComplaintsCount}
                approvedComplaintsCount={approvedComplaintsCount}
                pendingComplaintsCount={pendingComplaintsCount}
              />}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <section className="text-gray-600 overflow-hidden w-full lg:w-3/4">
            <div className="container px-10 py-24 mx-auto">
              <div className="m-4 divide-y-2 divide-newpurple">
                {complaints.map((complaint) => (
                  <Majorissues
                    key={complaint._id}
                    roll_no={complaint.rollNumber}
                    timestamp={new Date(complaint.createdAt).toLocaleString()}
                    category={complaint.issue}
                    heading={"Problems regarding " + complaint.issue}
                    description={complaint.description}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="text-orange-600 body-font w-full lg:w-1/4 pt-28">
            <div className=" font-medium text-xl px-2 py-3 hover:underline hover:underline-offset-3 pt-24">
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
