const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { updateStatus } = require("../controllers/adminController");

const router = express.Router();
router.put("/updatestatus", protect, updateStatus);
module.exports = router;
