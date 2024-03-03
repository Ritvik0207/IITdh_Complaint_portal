/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import TableData from "./tabledata";

const Categories = (props) => {
  return (
    <div className="w-full mx-auto my-4">
      <div className="px-2 ">
        <button
          className="w-full text- flex items-center border-b-2  p-4 hover:border-b-2 hover:border-orange-500 text-lg text-gray-800 font-medium"
          onClick={() => {
            props.fun();
            // console.log(props.issue);
          }}
        >
          {props.name}
        </button>
      </div>
    </div>
  );
};

export default Categories;
