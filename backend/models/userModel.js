const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    roll_no: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      unique: true,
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
    room_no: {
      type: "String",
      required: true,
    },
    wing: {
      type: "String",
      required: true,
    },
    hostel_no: {
      type: "String",
      required: true,
    },
    mobile_number: {
      type: "String",
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    department: {
      type: "String",
      // required: true,
    },
  },
  { timestaps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
