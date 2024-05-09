import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Dashboard from "./dashboardv2";
import Example2 from "./example2";
import LoadingBar from "react-top-loading-bar";
import ManageTeam from "./manageTeam";
import Loader from "./loader";
import AddTeam from "./addTeam";

const Maincontent = ({ activeSubLink, links }) => {
  // console.log(activeSubLink);
  const loadingBar = useRef(null);
  const [loading, setLoading] = useState(false);
  // const [complaints, setComplaints] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  let totalComplaints = [];

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const fetchComplaints = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const issue = JSON.parse(localStorage.getItem("userInfo")).department;
      setLoading(true);
      loadingBar.current.continuousStart();

      // Rohith TODO
      // /complaints  => to get all complaints
      // /complaints?filter_or_groupby=<>  => get all complaints based on filter
      // /complaints/:id  => get complaint by id

      let params = { issue: issue };
      const response = await axios.get(
        "http://localhost:5000/api/user/getcomplaintbycategory", // http://localhost:5000/api/user/getcomplaintbycategory"
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await sleep(1000);
      if (response.data.success) {
        totalComplaints = response.data.complaints;
        totalComplaints = totalComplaints.sort(
          (a, b) => b.upvoteCount - a.upvoteCount
        );
        // setComplaints(totalComplaints);
        setTickets(totalComplaints);

        setCounts([
          totalComplaints.length,
          totalComplaints.filter(
            (complaint) =>
              (complaint.isApproved || !complaint.isApproved) &&
              !complaint.isDone &&
              !complaint.isRejected
          ).length,
          totalComplaints.filter((complaint) => complaint.isDone).length,
          totalComplaints.filter((complaint) => complaint.isRejected).length,
        ]);

        loadingBar.current.complete();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (
      activeSubLink === "Dashboard" ||
      links["Ticket"].includes(activeSubLink)
    ) {
      fetchComplaints();
    }
  }, [activeSubLink]);

  return (
    <>
      <LoadingBar height={3} color="#f11946" ref={loadingBar} />
      {links["Home"].includes(activeSubLink) ? (
        !loading ? (
          <Dashboard TicketCounts={counts} Tickets={tickets} />
        ) : (
          <Loader />
        )
      ) : links["Ticket"].includes(activeSubLink) ? (
        !loading ? (
          <Example2
            activeSubLink={activeSubLink}
            Tickets={tickets}
            links={links}
          />
        ) : (
          <Loader />
        )
      ) : activeSubLink === "Manage Team" ? (
        <ManageTeam />
      ) : activeSubLink === "Add +" ? (
        <AddTeam />
      ) : null}
    </>
  );
};

export default Maincontent;
