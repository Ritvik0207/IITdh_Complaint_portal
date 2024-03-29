const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model if you have one
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String, // Assuming you'll store file paths
      },
    ],
    anonymous: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAssigned: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    isRejected: {
      type: Boolean,
      required: true,
      default: false,
    },
    feedback: {
      type: String,
      required: false,
      default: "",
    },
    upvoteCount: {
      type: Number,
      default: 0,
    },
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference the User model if you have one
      },
    ],
  },
  {
    timestamps: true, // Add timestamps option to enable createdAt and updatedAt fields
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
