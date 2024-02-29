/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { navLinks } from "../data/constants";
import { hamburger, logo1, logo2 } from "../assets/images";
import { Link, useNavigate } from "react-router-dom";

const Navbar2 = () => {
  const [activeNavLink, setActiveNavLink] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loginBool, setLoginBool] = useState(false);
  const navigate = useNavigate();

  const handleNavLinkClick = (navLink) => {
    setActiveNavLink(navLink);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleSignOut = () => {
    localStorage.removeItem("userInfo"); // Clear userInfo from localStorage
    navigate("/login"); // Navigate to the login page
  };
  return (
    <header className="px-8 sm:px-16 py-3 fixed z-30 w-full bg-[#89288f]">
      <nav className="flex justify-between items-center max-container">
        <div className="flex gap-4 justify-end max-lg:hidden">
          <button
            className="bg-white text-[#89288f] border-[3px] border-[#89288f] rounded-lg px-4 py-2 hover:border-orange-500"
            onClick={handleSignOut}
          >
            Sign out
          </button>
          {/* Add any other navigation links here */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar2;
