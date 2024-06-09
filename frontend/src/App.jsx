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
import Home from "./pages/Homepage";
import PrevComplaints from "./pages/prevComplaints";
import Feedback from "./pages/feedback";
import Example from "./components/example";
import NewTable from "./components/NewTable";
import NewTablev2 from "./components/NewTablev2";
import Trail from "./components/trail";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
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
        <Route
          path="/example"
          element={
            <ProtectedRoute>
              <Example />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NewTable"
          element={
            <ProtectedRoute>
              <NewTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NewTablev2"
          element={
            <ProtectedRoute>
              <NewTablev2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trail"
          element={
            <ProtectedRoute>
              <Trail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
