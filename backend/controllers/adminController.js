const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
const Complaint = require("../models/complaintModel");
const Management = require("../models/managementModel");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");

// Controller function to update the status of a complaint
const updateStatus = async (req, res) => {
  try {
    const { complaintId, status } = req.body;

    const complaint = await Complaint.findById(complaintId);

    let updatedComplaint;
    // For Rejecting
    if (status == "RejectRequest") {
      if (!complaint.isRejected && !complaint.isApproved) {
        updatedComplaint = await Complaint.findByIdAndUpdate(
          complaintId,
          { isRejected: true },
          { new: true }
        );
      }
    }
    // For Deleting
    else if (status == "DeleteRequest") {
      const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);
      if (deletedComplaint) {
        return res.status(200).json({
          success: true,
          message: "Complaint rejected and deleted successfully",
          deletedComplaint: deletedComplaint,
        });
      }
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }
    // For Updating
    // Update 1
    else {
      if (!complaint.isApproved) {
        updatedComplaint = await Complaint.findByIdAndUpdate(
          complaintId,
          { isApproved: true },
          { new: true }
        );
      }
      // Update 2
      else if (complaint.isApproved && !complaint.isAssigned) {
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
    }

    // Check if the updated complaint exists
    if (updatedComplaint) {
      // Return success response with updated complaint
      return res.status(200).json({
        success: true,
        message: "Complaint status updated successfully",
        updatedComplaint: updatedComplaint,
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "Complaint not found" });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const addMember = async (req, res) => {
  try {
    const { name, phoneNumber, email, position, password } = req.body;

    const memberExists = await Management.findOne({ email });

    if (memberExists) {
      return res
        .status(400)
        .json({ success: false, message: "Member already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newMember = await Management.create({
      name,
      phoneNumber,
      email,
      position,
      password: hashedPassword,
    });

    if (newMember) {
      return res.status(201).json({
        success: true,
        message: "New member added successfully",
        newMember: newMember,
      });
    }
    return res
      .status(400)
      .json({ success: false, message: "Failed to add new member" });
  } catch (error) {
    console.error("Error adding new member:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { updateStatus, addMember };
