/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const Adminview = ({ totalComplaintsCount, approvedComplaintsCount, pendingComplaintsCount }) => {
  return (
    <>
      <div className="flex justify-center flex-wrap w-full gap-16">
        <div className="">
          <p className=" font-montserrat leading-7 text-slate-gray text-2xl">
            Total Complaints
          </p>
          <p className="text-4xl font-palanquin font-bold text-center mt-5">
            {totalComplaintsCount}
          </p>
        </div>
        <div className="">
          <p className=" font-montserrat leading-7 text-slate-gray text-2xl">
            Approved Complaints
          </p>
          <p className="text-4xl font-palanquin font-bold text-center mt-5">
            {approvedComplaintsCount}
          </p>
        </div>
        <div className="">
          <p className=" font-montserrat leading-7 text-slate-gray text-2xl">
            Pending Complaints
          </p>
          <p className="text-4xl font-palanquin font-bold text-center mt-5">
            {pendingComplaintsCount}
          </p>
        </div>
      </div>
    </>
  );
};

export default Adminview;
