/* eslint-disable no-unused-vars */
import React from "react";
import {
  Navbar,
  Login,
  Register,
  Complaint,
  Dashboard,
  Categories,
  Details,
  Tabledata,
} from "./components/components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Home, Admin, Contact } from "./sections/sections";
import TableData from "./components/tabledata";
import PublicRoute from "./components/publicroute";
import ProtectedRoute from "./components/privateRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute> <Home /></PublicRoute>} />

        <Route path="/tabledata" element={<PublicRoute><Tabledata /></PublicRoute>} />
        <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute> <Register /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><TableData /></ProtectedRoute>} />
        <Route path="/complaint" element={<ProtectedRoute><Complaint /></ProtectedRoute>} />
      </Routes>
    </Router>
    // <Tabledata />
  );
};

export default App;
