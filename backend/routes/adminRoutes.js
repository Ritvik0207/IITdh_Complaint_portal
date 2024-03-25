const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { updateStatus, markasdone } = require("../controllers/adminController");

const router = express.Router();
router.put("/updatestatus", protect, updateStatus);
router.put("/markasdone", protect, markasdone);
module.exports = router;
