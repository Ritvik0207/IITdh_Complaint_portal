// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
const Complaint = require("../models/complaintModel");
const { ObjectId } = require("mongoose").Types;

// Controller function to update the status of a complaint
const updateStatus = async (req, res) => {
  try {
    const { complaintId, isApproved } = req.body;

    if (!isApproved) {
      // If the complaint is rejected (isApproved is false), delete the complaint from the database
      const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);
      if (!deletedComplaint) {
        return res
          .status(404)
          .json({ success: false, message: "Complaint not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Complaint rejected and deleted successfully",
        complaint: deletedComplaint,
      });
    }

    // If the complaint is approved, update its status
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { isApproved: isApproved },
      { new: true }
    );

    // Check if the complaint exists
    if (!updatedComplaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }

    // Return success response with updated complaint
    return res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const markasdone = async (req, res) => {
  try {
    const { complaintId } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        isDone: true,
      },
      { new: true }
    );
    if (!updatedComplaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }

    // Return success response with updated complaint
    return res.status(200).json({
      success: true,
      message: "Complaint marked as done",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Export the controller function
module.exports = { updateStatus, markasdone };
