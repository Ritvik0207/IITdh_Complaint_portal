/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Categories, MajorIssues, Navbar2 } from "./components";


const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);

  const navigate = useNavigate(); // Using useNavigate hook


  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/complaintsList");
  //     const data = await response.json();
  //     console.log(data);
  //     setComplaints(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  return (
    <>
      <Navbar2 />
      <div className="flex flex-col lg:flex-row">
        <section className="text-gray-600 overflow-hidden w-full lg:w-3/4">
          <div className="container px-10 py-24 mx-auto">
            <div className="m-4 divide-y-2 divide-newpurple">
              {complaints.map((complaint) => (
                <MajorIssues
                  key={complaint.id}
                  roll_no={complaint.created_by}
                  timestamp={new Date(complaint.created_at).toLocaleString()}
                  category={complaint.label}
                  heading={"Problems regarding " + complaint.label}
                  description={complaint.description}
                  voteCount={complaint.upvotes}
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
          {/* <Categories category="Electricity" />
          <Categories category="Hostel Affairs" /> */}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
