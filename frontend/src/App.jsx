/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/privateRoute";
import PublicRoute from "./components/publicRoute";
import Notification from "./components/Notification";
import Navbar from "./components/navbar";
import Login from "./pages/Authentication/login";
import Register from "./pages/Authentication/register";
import Complaint from "./pages/complaint";
import Dashboard from "./pages/dashboard";
import Home from "./sections/Home";
import Contact from "./sections/Contact";
import PrevComplaints from "./pages/prevComplaints";
import Feedback from "./pages/feedback";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        loginStatus={(bool) => {
          setIsLoggedIn(bool);
        }}
      />
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              {" "}
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login loginStatus={() => setIsLoggedIn(true)} />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              {" "}
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaint"
          element={
            <ProtectedRoute>
              <Complaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prevcomplaints"
          element={
            <ProtectedRoute>
              <PrevComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
