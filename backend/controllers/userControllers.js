const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require('bcrypt');
const Complaint = require("../models/complaintModel");
const { ObjectId } = require('mongoose').Types;
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, room_no, wing, hostel_no, mobile_number } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        room_no,
        wing,
        hostel_no,
        mobile_number
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            room_no: user.room_no,
            wing: user.wing,
            hostel_no: user.hostel_no,
            mobile_number: user.mobile_number,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                room_no: user.room_no,
                wing: user.wing,
                hostel_no: user.hostel_no,
                mobile_number: user.mobile_number,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const registerComplaint = async (req, res) => {
    try {
        const { fullname, rollNumber, description, issue } = req.body;
        const userId = req.user._id; // Access user ID from req.user

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid userId' });
        }
        const newComplaint = new Complaint({ userId, fullname, rollNumber, description, issue });
        await newComplaint.save();

        res.status(201).json({ success: true, message: 'Complaint registered successfully' });
    } catch (error) {
        console.error('An error occurred during complaint registration:', error);
        res.status(500).json({ success: false, message: 'Failed to register complaint' });
    }
};
const getComplaint = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json({ success: true, complaints }); // Sending complaints with success flag
    } catch (error) {
        console.error("Error fetching complaints:", error);
        res.status(500).json({ success: false, error: "Failed to fetch complaints" }); // Sending error with success flag
    }
};




module.exports = { registerComplaint, registerUser, authUser, getComplaint };