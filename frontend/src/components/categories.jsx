/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Categories = (props) => {
  return (
    <button
      className="w-full flex items-center  text-lg text-gray-800 font-medium"
      onClick={() => {
        props.fun(props.issue);
      }}
    >
      {props.name}
    </button>
  );
};

export default Categories;
