const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");
const Complaint = require("../models/complaintModel");
const { ObjectId } = require("mongoose").Types;
const path = require("path"); // Import the path module

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    room_no,
    wing,
    hostel_no,
    mobile_number,
    roll_no,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res
      .status(200)
      .json({ success: false, message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roll_no,
    room_no,
    wing,
    hostel_no,
    mobile_number,
  });

  if (user) {
    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      roll_no: user.roll_no,
      email: user.email,
      isAdmin: user.isAdmin,
      room_no: user.room_no,
      wing: user.wing,
      hostel_no: user.hostel_no,
      mobile_number: user.mobile_number,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ success: false, message: "Some Error occurred" });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        room_no: user.room_no,
        roll_no: user.roll_no,
        wing: user.wing,
        hostel_no: user.hostel_no,
        mobile_number: user.mobile_number,
        token: generateToken(user._id),
      });
    } else {
      res.status(500);
      throw new Error("Some Error occurred");
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
});

const registerComplaint = async (req, res) => {
  try {
    const { fullname, rollNumber, subject, description, issue, anonymous } =
      req.body;
    const userId = req.user._id; // Access user ID from req.user
    const photos = req.files.map((file) => path.basename(file.path)); // Get filenames from req.files

    const newComplaint = new Complaint({
      userId,
      fullname,
      rollNumber,
      subject,
      description,
      issue,
      photos: photos, // Store only filenames in the database
      anonymous,
    });
    await newComplaint.save();

    res
      .status(201)
      .json({ success: true, message: "Complaint registered successfully" });
  } catch (error) {
    console.error("An error occurred during complaint registration:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to register complaint" });
  }
};

const getComplaint = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      issue: { $ne: "Hostel_affairs" },
      anonymous: false,
    });
    res.json({ success: true, complaints }); // Sending complaints with success flag
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch complaints" }); // Sending error with success flag
  }
};

const getComplaintsByCategory = async (req, res) => {
  try {
    const { issue } = req.query; // Extracting the issue from the request query
    // Find complaints by the specified issue
    const complaints = await Complaint.find({ issue: issue });

    res.json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch complaints" });
  }
};

const getUserComplaints = async (req, res) => {
  try {
    const userId = req.user._id;

    const complaints = await Complaint.find({ userId: userId });

    res.json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch complaints" });
  }
};

const setUpvote = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Find the complaint by ID
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }

    // Check if the user has already upvoted this complaint
    if (complaint.upvotedBy.includes(req.user._id)) {
      return res.status(200).json({
        success: false,
        message: "You have already upvoted this complaint",
      });
    }

    // Increment the upvote count
    complaint.upvoteCount++;
    // Add the user to the list of upvoters
    complaint.upvotedBy.push(req.user._id);
    // Save the updated complaint
    await complaint.save();

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Complaint upvoted successfully" });
  } catch (error) {
    console.error("Error upvoting complaint:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  authUser,
  registerComplaint,
  getComplaint,
  getComplaintsByCategory,
  getUserComplaints,
  setUpvote,
};
