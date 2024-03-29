const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  updateStatus,
  rejectComplaint,
  deleteComplaint,
} = require("../controllers/adminController");

const router = express.Router();
router.put("/updatestatus", protect, updateStatus);
router.put("/rejectComplaint", protect, rejectComplaint);
router.put("/deleteComplaint", protect, deleteComplaint);
module.exports = router;
