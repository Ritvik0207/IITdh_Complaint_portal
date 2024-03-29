// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
const Complaint = require("../models/complaintModel");
const { ObjectId } = require("mongoose").Types;

// Controller function to update the status of a complaint
const updateStatus = async (req, res) => {
  try {
    const { complaintId } = req.body;

    const complaint = await Complaint.findById(complaintId);

    let updatedComplaint;
    // Update 1
    if (!complaint.isApproved && !complaint.isAssigned && !complaint.isDone) {
      updatedComplaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { isApproved: true },
        { new: true }
      );
    }
    // Update 2
    else if (
      complaint.isApproved &&
      !complaint.isAssigned &&
      !complaint.isDone
    ) {
      updatedComplaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { isAssigned: true },
        { new: true }
      );
    }
    // Update 3
    else if (
      complaint.isApproved &&
      complaint.isAssigned &&
      !complaint.isDone
    ) {
      updatedComplaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { isDone: true },
        { new: true }
      );
    }
    // Update 4
    // else if (
    //   !complaint.isApproved &&
    //   !complaint.isAssigned &&
    //   !complaint.isDone &&
    //   !complaint.isRejected
    // ) {
    //   updatedComplaint = await Complaint.findByIdAndUpdate(
    //     complaintId,
    //     { isRejected: true },
    //     { new: true }
    //   );
    // }

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
      updatedComplaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const rejectComplaint = async (req, res) => {
  try {
    const { complaintId } = req.body;

    const complaint = await Complaint.findById(complaintId);

    let updatedComplaint;
    if (!complaint.isRejected) {
      updatedComplaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { isRejected: true },
        { new: true }
      );
    }

    // Check if the complaint exists
    if (!updatedComplaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }
    // Return success response with updated complaint
    return res.status(200).json({
      success: true,
      message: "Complaint rejected successfully",
      updatedComplaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Error while rejecting the complaint:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.body;

    const complaint = await Complaint.findById(complaintId);

    if (complaint.isRejected) {
      const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);
      if (!deletedComplaint) {
        return res
          .status(404)
          .json({ success: false, message: "Complaint not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Complaint rejected and deleted successfully",
        deletedComplaint: deletedComplaint,
      });
    }
  } catch (error) {
    console.error("Error while deleting the complaint:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Export the controller function
module.exports = { updateStatus, rejectComplaint, deleteComplaint };
