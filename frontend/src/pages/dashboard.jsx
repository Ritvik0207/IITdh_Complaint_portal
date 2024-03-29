import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "../components/categories";
import TableData from "../components/tabledata";
import Majorissues from "../components/majorissues";
import { Link } from "react-router-dom";
import Adminview from "../components/adminview";
import LoadingBar from "react-top-loading-bar";

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
  const loadingBar = useRef(null);

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
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
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
                  <div className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg text-gray-500">
                    <Categories
                      name="Food"
                      issue="Food"
                      fun={(issue) => {
                        setCatSelected(true);
                        setIssue(issue);
                      }}
                    />
                    {/* <button
                      className="w-full flex items-center p-3 text-lg text-gray-800 font-medium"
                      onClick={(issue) => {
                        setCatSelected(true);
                        setIssue(issue);
                      }}
                    >
                      Food related issues
                    </button> */}
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
                  </div>
                  <Link to={"/example"}>Example</Link>
                </nav>
              </aside>
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
                      className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors hover:shadow-md"
                      onClick={() => {
                        handleCategoryFilter("Food");
                      }}
                    >
                      <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                        Food
                      </div>
                    </button>
                    <button
                      className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors hover:shadow-md"
                      onClick={() => {
                        handleCategoryFilter("Water");
                      }}
                    >
                      <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                        Water
                      </div>
                    </button>
                    <button
                      className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors hover:shadow-md"
                      onClick={() => {
                        handleCategoryFilter("Electricity");
                      }}
                    >
                      <div className="hover:drop-shadow-lg hover:text-gray-700 transition-colors w-full px-4">
                        Electricity
                      </div>
                    </button>
                    <button
                      className="w-auto py-1 bg-orange-500 rounded-3xl font-palanquin font-medium text-xl text-white hover:bg-gray-100 border-2 border-transparent hover:border-gray-700 transition-colors hover:shadow-md"
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
          </section>

          <section className="text-orange-500 body-font w-full lg:w-1/4">
            <div className="w-full p-1 flex items-center justify-start box-border mb-16 pe-10 pt-28">
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
            </div>

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
          </section>
        </div>
      )}
    </>
  );
};

export default Dashboard;
