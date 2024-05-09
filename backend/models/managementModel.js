const mongoose = require("mongoose");

const managementSchema = mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    phoneNumber: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      unique: true,
      required: true,
    },
    position: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
  },
  { timestaps: true }
);

const Management = mongoose.model("Management", managementSchema);

module.exports = Management;
