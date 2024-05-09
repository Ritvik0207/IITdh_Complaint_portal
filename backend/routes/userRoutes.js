const express = require("express");
const {
  registerUser,
  authUser,
  registerComplaint,
  getComplaints,
  getAllComplaints,
  getComplaintsByCategory,
  getComplaintById,
  getUserComplaints,
  setUpvote,
  submitFeedback,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // Use absolute path for upload destination
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.route("/").post(registerUser);
router.post("/login", authUser);

// Ensure that upload middleware is placed before the registerComplaint controller
router.post(
  "/postcomplaint",
  protect,
  upload.array("photos", 5),
  registerComplaint
);

router.get("/getcomplaints", protect, getComplaints);
router.get("/getAllComplaints", protect, getAllComplaints);
router.get("/getcomplaintbycategory", protect, getComplaintsByCategory);
router.get("/getcomplaintbyId/:id", protect, getComplaintById);
router.get("/usercomplaints", protect, getUserComplaints);
router.post("/complaints/upvote/:id", protect, setUpvote);
router.post("/postfeedback", protect, submitFeedback);

module.exports = router;
