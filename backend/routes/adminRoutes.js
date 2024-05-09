const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { updateStatus, addMember } = require("../controllers/adminController");

const router = express.Router();
router.put("/updatestatus", protect, updateStatus);
router.post("/addMember", protect, addMember);

module.exports = router;
