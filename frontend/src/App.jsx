/* eslint-disable no-unused-vars */
import React from "react";
// import {
//   Navbar,
//   Login,
//   Register,
//   Complaint,
//   Dashboard,
//   Categories,
//   Details,
//   Tabledata,
// } from "./components/components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import { Home, Contact } from "./sections/sections";
import PublicRoute from "./components/publicRoute";
import ProtectedRoute from "./components/privateRoute";
import Login from "./pages/Authentication/login";
import Register from "./pages/Authentication/register";
import Dashboard from "./pages/dashboard";
import Complaint from "./pages/complaint";
import Navbar from "./components/navbar";
import Home from "./sections/Home";
import Contact from "./sections/Contact";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute> <Home /></PublicRoute>} />
        <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute> <Register /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/complaint" element={<ProtectedRoute><Complaint /></ProtectedRoute>} />
      </Routes>
    </Router>
    // <Tabledata />
  );
};

export default App;
