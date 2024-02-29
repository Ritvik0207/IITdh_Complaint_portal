const express = require("express");
const {
  registerUser,
  authUser,
  registerComplaint,
  getComplaint,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/postcomplaint", protect, registerComplaint)
router.get("/getcomplaints", protect, getComplaint)
module.exports = router;