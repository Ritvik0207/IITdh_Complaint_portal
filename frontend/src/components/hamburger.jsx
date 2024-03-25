import React from "react";
import { Link } from "react-router-dom";

const Hamburger = ({ toggleDropdown }) => {
  return (
    <ul className="bg-[#89288f] absolute top-full right-1 mt-[1px] h-auto py-2 align-baseline rounded-md w-40 text-center divide-y-2">
      <li>
        <Link
          to={"/login"}
          className="block text-white text-lg py-2 hover:bg-orange-500 hover:text-white"
          onClick={toggleDropdown}
        >
          Sign In
        </Link>
      </li>
      <li>
        <Link
          to={"/register"}
          className="block text-white text-lg py-2 hover:bg-orange-500 hover:text-white"
          onClick={toggleDropdown}
        >
          Register
        </Link>
      </li>
    </ul>
  );
};

export default Hamburger;
