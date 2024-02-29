/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { navLinks } from "../data/constants";
import { hamburger, logo1, logo2 } from "../assets/images";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeNavLink, setActiveNavLink] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavLinkClick = (navLink) => {
    setActiveNavLink(navLink);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
            className="rounded-sm inline-block bg-slate-50"
          />
          <img
            src={logo2}
            alt="college name"
            height={40}
            width={200}
            className="inline-block ms-1"
          />
        </Link>

        <div className="hidden max-lg:block">
          <div className="cursor-pointer" onClick={toggleDropdown}>
            <img src={hamburger} alt="Hamburger Logo" width={25} height={25} />
          </div>
          {showDropdown && (
            <ul className="bg-[#89288f] absolute top-full right-1 mt-[1px] h-52 py-2 align-baseline rounded-md w-40 text-center">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`block text-white text-lg py-2 hover:text-white border-b-[1px] border-white`}
                    onClick={() => handleNavLinkClick(item.id)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={"/login"}
                  className="block text-white text-lg py-2 hover:bg-orange-500 hover:text-white border-b-[1px] border-white"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard"}
                  className="block text-white text-lg py-2 hover:bg-orange-500 hover:text-white"
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>

        <ul className="flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className={`font-montserrat leading-normal text-lg pb-1 text-slate-50  ${activeNavLink === item.id
                    ? "border-b-[3px] border-orange-500"
                    : ""
                  }`}
                onClick={() => handleNavLinkClick(item.id)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className=" flex gap-4 justify-end max-lg:hidden">
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
