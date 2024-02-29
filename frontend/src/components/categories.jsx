import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const categories = (props) => {
  const [id, setId] = useState("");

  return (
    <div className="container px-5 py-3 mx-auto">
      <div className="px-2 w-full">
        <Link
          className="h-full flex items-center border-newpurple border-2 p-4 rounded-lg text-gray-900 title-font font-medium"
          to="/complaint"
        >
          {props.category}
        </Link>
      </div>
    </div>
  );
};

export default categories;
