/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Categories from "../components/categories";
import TableData from "../components/tabledata";
import Majorissues from "../components/majorissues";
import { Link } from "react-router-dom";
import Adminview from "../components/adminview";
import LoadingBar from "react-top-loading-bar";
import { RxDropdownMenu } from "react-icons/rx";
import OutsideClickHandler from "react-outside-click-handler";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCatSelected, setCatSelected] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [complaintsCopy, setComplaintsCopy] = useState([]);
  const [issue, setIssue] = useState("");
  const [filterBy, setFilterBy] = useState("votes");
  const [totalComplaintsCount, setTotalComplaintsCount] = useState(0);
  const [approvedComplaintsCount, setApprovedComplaintsCount] = useState(0);
  const [pendingComplaintsCount, setPendingComplaintsCount] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [loading, setLoading] = useState(false);
  const [DropdownVisible, setDropdownVisible] = useState(false);
  const loadingBar = useRef(null);

  const buttons = [
    { label: "Food", category: "Food" },
    { label: "Water", category: "Water" },
    { label: "Electricity", category: "Electricity" },
    { label: "All", category: "All" },
  ];

  const handleCategoryFilter = (category) => {
    setSelectedIssue(category);
    if (category === "All") {
      setComplaintsCopy(complaints);
    } else {
      const filteredComplaints = complaints.filter(
        (complaint) => complaint.issue === category
      );
      setComplaintsCopy(filteredComplaints);
    }
  };

  const fetchData = async () => {
    console.log("Here");
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    console.log(token);
    try {
      setLoading(true);
      loadingBar.current.continuousStart(); // Start the loading bar
      const response = await axios.get(
        "http://localhost:5000/api/user/getcomplaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        let sortedComplaints = response.data.complaints;
        // Sort complaints based on the selected option
        if (filterBy === "votes") {
          sortedComplaints = sortedComplaints.sort(
            (a, b) => b.upvoteCount - a.upvoteCount
          );
        } else if (filterBy === "date") {
          sortedComplaints = sortedComplaints.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }

        setComplaints(sortedComplaints);
        setComplaintsCopy(sortedComplaints);
        loadingBar.current.complete();
        setLoading(false); // Complete the loading bar
      } else {
        throw new Error("Failed to fetch complaints");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.isAdmin) {
      // setDepartment(userInfo.department);
      setIsAdmin(true);
      fetchData();
    } else {
      setIsAdmin(false);
      fetchData();
    }
  }, [filterBy]);

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
      <LoadingBar height={3} color="#f11946" ref={loadingBar} />
      {isAdmin ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
          {/* <h1 className="text-3xl font-bold mb-8 pb-2 text-[#89288f] border-b-gray-400 border-b-2">
            Welcome Admin
          </h1> */}
          <div className="py-16 w-full">
            <div className="flex flex-row max-sm:flex-col">
              <aside className="sticky top-0 h-screen w-1/6 bg-gray-100 text-gray-800 py-10 px-6">
                <nav className="space-y-2">
                  {/* <div className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg text-gray-500">
                    <Categories
                      name="Food"
                      issue="Food"
                      fun={(issue) => {
                        setCatSelected(true);
                        setIssue(issue);
                      }}
                    />
                  </div>
                  <div className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                    <Categories
                      name="Water"
                      issue="Water"
                      fun={(issue) => {
                        setCatSelected(true);
                        setIssue(issue);
                      }}
                    />
                  </div>
                  <div className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                    <Categories
                      name="Electricity"
                      issue="Electricity"
                      fun={(issue) => {
                        setCatSelected(true);
                        setIssue(issue);
                      }}
                    />
                  </div>
                  <div className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                    <Categories
                      name="Hostel Affaires"
                      issue="Hostel_affairs"
                      fun={(issue) => {
                        setCatSelected(true);
                        setIssue(issue);
                      }}
                    />
                  </div> */}
                  <Link to={"/example"}>Example</Link>
                  <br />
                  <Link to={"/NewTable"}>NewTable</Link>
                  <br />
                  <Link to={"/NewTablev2"}>NewTablev2</Link>
                  <br />
                  <Link to={"/trail"}>Trail</Link>
                  <br />
                </nav>
              </aside>
              {/* <div className=" flex flex-1 justify-center items-center ps-10">
                {isCatSelected ? (
                  <TableData issue={issue} />
                ) : (
                  <Adminview
                    totalComplaintsCount={totalComplaintsCount}
                    approvedComplaintsCount={approvedComplaintsCount}
                    pendingComplaintsCount={pendingComplaintsCount}
                  />
                )}
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <section className="min-h-screen w-full grid bg-white">
          <div className="h-full w-full pt-14">
            {/* <div className="h-full w-full"> */}
            <div className="flex pt-6 max-lg:justify-between">
              <div className="flex justify-between items-center w-3/4 ms-16">
                <h1 className="text-gray-600 font-palanquin text-2xl font-bold text-nowrap">
                  Complaint Dashboard
                </h1>
                <div className="flex justify-center items-center me-12 max-lg:me-6 max-lg:hidden">
                  <div className="flex gap-2 flex-auto flex-wrap justify-center">
                    {buttons.map((button, index) => (
                      <button
                        key={index}
                        className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-lg text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors max-[1150px]:text-base"
                        onClick={() => handleCategoryFilter(button.category)}
                      >
                        <span className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                          {button.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <OutsideClickHandler
                  onOutsideClick={() => {
                    setDropdownVisible(false);
                  }}
                >
                  <div className="items-center relative cursor-pointer hidden max-lg:block me-10">
                    <button
                      type="button"
                      className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-2 py-1 inline-flex items-center"
                      onClick={() => {
                        setDropdownVisible(!DropdownVisible);
                      }}
                    >
                      <RxDropdownMenu size={20} />
                    </button>

                    {DropdownVisible && (
                      <div className="flex-col items-start gap-1 absolute top-full -left-1/2 -ms-6 mt-1 justify-center bg-gray-100 rounded-lg shadow w-28">
                        <ul className="py-2 text-sm text-gray-700 font-medium">
                          {buttons.map((button, index) => (
                            <li
                              key={index}
                              className="hover:bg-gray-400 hover:text-white"
                            >
                              <button
                                className="inline-block w-full px-2 py-2 hover:bg-gray-400 hover:text-white"
                                onClick={() =>
                                  handleCategoryFilter(button.category)
                                }
                              >
                                <span className="w-full px-4">
                                  {button.label}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </OutsideClickHandler>
              </div>
              <div className="inline-flex justify-end items-center w-1/4 me-8 max-lg:me-16">
                <div className="flex items-center">
                  <label
                    htmlFor="filter"
                    className="text-lg text-gray-600 me-1 tracking-wider font-semibold w-auto text-nowrap"
                  >
                    Filter By :
                  </label>
                  <select
                    id="filter"
                    className="w-32 ms-2 appearance-none rounded-lg border-2 border-gray-400 px-4 py-1 shadow-sm focus:border-orange-500 focus:outline-none text-gray-500 font-semibold"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                  >
                    <option value="votes">Votes</option>
                    <option value="date">Date</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="text-gray-600 w-full lg:w-3/4">
                <div className="px-10 py-0">
                  <div className="flex justify-between items-center mx-4">
                    {/* <h1 className="text-gray-600 font-palanquin text-2xl font-bold px-4 text-nowrap">
                        Complaint Dashboard
                      </h1>
                      <div className="flex justify-center me-4">
                        <div className="flex gap-2 flex-auto flex-wrap justify-center">
                          {buttons.map((button, index) => (
                            <button
                              key={index}
                              className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors hover:shadow-md"
                              onClick={() =>
                                handleCategoryFilter(button.category)
                              }
                            >
                              <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                                {button.label}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div> */}
                  </div>
                  <div className="m-4">
                    {complaintsCopy.length == 0 && !loading ? (
                      <h2 className="pt-30 font-palanquin font-semibold text-2xl text-orange-400 flex justify-center items-center h-full w-full pt-20">
                        No complaints registered
                      </h2>
                    ) : (
                      complaintsCopy.map((complaint) => (
                        <Majorissues
                          key={complaint._id}
                          timestamp={complaint.createdAt}
                          issue={complaint.issue}
                          subject={complaint.subject}
                          description={complaint.description}
                          upvoteCount={complaint.upvoteCount}
                          complaintId={complaint._id}
                          upvotedBy={complaint.upvotedBy}
                          photos={complaint.photos}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              <aside className="w-full lg:w-1/4">
                <div className="flex flex-col justify-start items-center mx-4 h-full">
                  {/* <div className="w-80 p-1 flex items-center justify-start box-border mx-auto pt-28">
                      <label
                        htmlFor="filter"
                        className="text-xl text-gray-600 mx-1 ms-1 tracking-wider font-semibold w-auto text-nowrap"
                      >
                        Filter By :
                      </label>
                      <select
                        id="filter"
                        className="w-full ms-2 appearance-none rounded-lg border-2 border-gray-400 px-4 py-2 shadow-sm focus:border-orange-500 focus:outline-none text-gray-500 font-semibold"
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                      >
                        <option value="votes">Votes</option>
                        <option value="date">Date</option>
                      </select>
                    </div> */}

                  <div className="font-medium text-xl py-3 text-center space-y-3 flex flex-col justify-center items-center">
                    <div className="font-montserrat font-semibold w-full pb-5 text-lg">
                      Complaint Status & New Complaints ?
                    </div>
                    <div className="w-5/6">
                      <Link
                        className="h-full flex items-center border-newpurple border-2 p-4 rounded-lg text-gray-900 font-medium text-lg"
                        to="/complaint"
                      >
                        Register a Complaint
                      </Link>
                    </div>
                    <div className="w-5/6">
                      <Link
                        className="h-full flex items-center border-newpurple border-2 p-4 rounded-lg text-gray-900 font-medium text-lg"
                        to="/prevcomplaints"
                      >
                        View Previous Complaints
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
            {/* </div> */}
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;
