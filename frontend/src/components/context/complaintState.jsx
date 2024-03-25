import ComplaintContext from "./complaintContext";
import { useState } from "react";

const ComplaintState = (props) => {
  const [complaints, setComplaints] = useState([]);
  const getComplaints = async () => {
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
      } else {
        throw new Error("Failed to fetch complaints");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <ComplaintContext.Provider values={{ getComplaints }}>
        {props.children}
      </ComplaintContext.Provider>
    </>
  );
};

export default ComplaintState;
