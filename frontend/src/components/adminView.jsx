import React from "react";
// import { button } from "react-router-dom";

const Adminview = () => {
  return (
    <>
      <div className="flex justify-center flex-wrap w-full gap-16">
        <div className="">
          <p className=" font-montserrat leading-7 text-slate-gray text-2xl">
            Total Complaints
          </p>
          <p className="text-4xl font-palanquin font-bold text-center mt-5">
            25
          </p>
        </div>
        <div className="">
          <p className=" font-montserrat leading-7 text-slate-gray text-2xl">
            Approved Complaints
          </p>
          <p className="text-4xl font-palanquin font-bold text-center mt-5">
            12
          </p>
        </div>
        <div className="">
          <p className=" font-montserrat leading-7 text-slate-gray text-2xl">
            Pending Complaints
          </p>
          <p className="text-4xl font-palanquin font-bold text-center mt-5">
            4
          </p>
        </div>
      </div>
    </>
  );
};

export default Adminview;
