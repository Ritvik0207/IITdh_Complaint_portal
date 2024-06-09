const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");
const Complaint = require("../models/complaintModel");
const { ObjectId } = require("mongoose").Types;
const path = require("path"); // Import the path module

const registerUser = asyncHandler(async (req, res) => {
  try {
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
        success: true,
        message: "Registration successful!",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Internal server error occurred" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error occurred" });
  }
});

const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, checkbox } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const tokenExpiry = checkbox ? "30d" : "1d";

        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          room_no: user.room_no,
          roll_no: user.roll_no,
          department: user.department,
          wing: user.wing,
          hostel_no: user.hostel_no,
          mobile_number: user.mobile_number,
          token: generateToken(user._id, tokenExpiry),
          success: true,
          message: "Login Successful",
        });
      } else {
        // console.log("password wrong");
        return res.json({ success: false, message: "Invalid Credentials" });
      }
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    // console.error("Error while logging in:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to Login due to Server Error" });
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

const submitFeedback = async (req, res) => {
  try {
    const { complaintId, feedback } = req.body;
    console.log(complaintId);
    // Update the feedback field of the complaint
    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { feedback: feedback },
      { new: true }
    );
    if (complaint) {
      res
        .status(200)
        .json({ success: true, message: "Feedback submitted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Some error occurred" });
    }
  } catch (error) {
    // Handle errors
    console.error("An error occurred during feedback submission:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit feedback" });
  }
};

const getComplaints = async (req, res) => {
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

const getAllComplaints = async (req, res) => {
  try {
    const { issue } = req.query;
    // Find all complaints that match the given issue
    const complaints = await Complaint.find({ issue });

    return res.json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getComplaintsByCategory = async (req, res) => {
  try {
    const { issue, status } = req.query;

    let query = { issue }; // Base query with the specified issue

    // Adjust the query based on the status parameter
    switch (status) {
      case "New Tickets":
        query.isApproved = false;
        query.isRejected = false;
        break;
      case "Pending Tickets":
        query.isApproved = true;
        query.isDone = false;
        break;
      case "Resolved Tickets":
        query.isDone = true;
        break;
      case "Rejected Tickets":
        query.isRejected = true;
        break;
      default:
        // Handle the case where status doesn't match any known condition
        break;
    }

    // Find complaints based on the constructed query
    const complaints = await Complaint.find(query);

    res.json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch complaints" });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }
    res.status(200).json({ success: true, complaint });
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
  getComplaints,
  getAllComplaints,
  getComplaintsByCategory,
  getComplaintById,
  getUserComplaints,
  setUpvote,
  submitFeedback,
};
