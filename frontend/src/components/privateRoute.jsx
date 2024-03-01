/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    if (!localStorage.getItem("userInfo")) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
}
