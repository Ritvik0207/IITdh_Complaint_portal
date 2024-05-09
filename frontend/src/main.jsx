import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Strict mode is removed to avoid double rendering of the components
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
