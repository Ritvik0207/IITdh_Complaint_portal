import React from "react";
import { Flip, Slide, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  return (
    <ToastContainer
      limit={1}
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      // pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      transition={Zoom}
      toastStyle={{
        marginTop: "20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};

export default Notification;
