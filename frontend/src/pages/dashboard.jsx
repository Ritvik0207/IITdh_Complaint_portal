/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/navbar2";
import Navbar from "../components/navbar";
import TableData from "../components/tabledata";
import Categories from "../components/categories";
import Majorissues from "../components/majorissues";
const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.isAdmin) {
      setIsAdmin(true);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const response = await axios.get("http://localhost:5000/api/user/getcomplaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setComplaints(response.data.complaints);
      } else {
        throw new Error("Failed to fetch complaints");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Navbar2 />
      {isAdmin ? (
        <TableData />
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
            <Categories category="Track your Complaints" />
            <Categories category="Register a Complaint" />
          </section>
        </div>
      )}
    </>
  );
};

export default Dashboard;
