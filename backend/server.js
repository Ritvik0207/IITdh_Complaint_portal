const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const cors = require("cors"); // Import the cors middleware

dotenv.config();
connectDB();
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
