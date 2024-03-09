const express = require("express");
const {
  registerUser,
  authUser,
  registerComplaint,
  getComplaint,
  getComplaintsByCategory,
  getUserComplaints,
  setUpvote,

} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/postcomplaint", protect, registerComplaint);
router.get("/getcomplaints", protect, getComplaint);
router.get("/getcomplaintbycategory", protect, getComplaintsByCategory);
router.get("/usercomplaints", protect, getUserComplaints);
router.post("/complaints/upvote/:id", protect, setUpvote);
module.exports = router;
