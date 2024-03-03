import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hamburger, logo1, logo2 } from "../assets/images";

const Navbar = ({ isLoggedIn, loginStatus }) => {
  const [activeNavLink, setActiveNavLink] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  if (localStorage.getItem("userInfo")) {
    // console.log("checking token");
    loginStatus(true);
  }

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
    loginStatus(false);
  };

  return (
    <header className="px-8 sm:px-16 py-3 fixed z-30 w-full bg-[#89288f]">
      <nav className="flex justify-between items-center max-container">
        <Link
          to={"/"}
          className="flex"
          onClick={() => handleNavLinkClick("home")}
        >
          <img
            src={logo1}
            alt="college logo"
            height={20}
            width={40}
            className="rounded-[4px] inline-block bg-slate-50"
          />
          <img
            src={logo2}
            alt="college name"
            height={40}
            width={200}
            className="inline-block ms-1"
          />
        </Link>

        <div className=" flex gap-4 justify-end max-lg:hidden">
          {isLoggedIn ? (
            <button
              className="bg-white text-[#89288f] border-[3px] border-[#89288f] rounded-lg px-4 py-2 hover:border-orange-500"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                className="bg-white text-[#89288f] border-[3px] border-[#89288f] rounded-lg px-4 py-2 hover:border-orange-500"
                to={"/login"}
              >
                Sign In
              </Link>
              <Link
                className="text-white border-[3px] border-newpurple hover:border-[3px] hover:border-orange-500 hover:rounded-lg px-4 py-2"
                to={"/register"}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
