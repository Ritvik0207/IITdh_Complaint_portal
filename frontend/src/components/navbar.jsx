/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo1, logo2, profile } from "../assets/images";
import { RxHamburgerMenu } from "react-icons/rx";
import Profile from "./profile";
import OutsideClickHandler from "react-outside-click-handler";

const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const info = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (info) {
      setLoggedIn(true);
    }
  });

  const menuItems = [
    { path: "/login", label: "Sign In" },
    { path: "/register", label: "Register" },
  ];

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userInfo"); // Clear userInfo from localStorage
    navigate("/"); // Navigate to the login page
    setLoggedIn(false);
  };

  return (
    <header className="px-16 py-1 fixed z-50 w-full bg-newpurple lg:ps-16 lg:pe-8 md:ps-12 md:pe-6 sm:px-16 sm:pe-8 max-sm:ps-6 max-sm:pe-3">
      <nav className="flex justify-between items-center">
        <Link to={"/"} className="flex h-auto focus:outline-none">
          <img
            src={logo1}
            alt="college logo"
            width={40}
            className="rounded-[4px] inline-block bg-slate-50 scale-[85%]"
          />
          <img
            src={logo2}
            alt="college name"
            width={200}
            className="inline-block -ms-3 scale-[85%]"
          />
        </Link>

        <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
          <div className="invisible max-md:visible">
            <div
              className={`cursor-pointer p-2 border-2 border-newpurple rounded-full hover:border-orange-500 ${
                showDropdown && "border-orange-500"
              }`}
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <RxHamburgerMenu size={20} color="white" />
            </div>
            {showDropdown && (
              <ul className="bg-[#89288f] absolute top-full right-1 mt-[1px] h-auto w-auto align-baseline rounded-md text-center divide-y-2">
                {isLoggedIn ? (
                  <>
                    <li>
                      <button className="block text-white text-base py-2 px-10 hover:bg-orange-500 rounded-md">
                        Sign Out
                      </button>
                    </li>
                    <li>
                      <button className="block text-white text-base py-2 px-10 hover:bg-orange-500 rounded-md">
                        Profile
                      </button>
                    </li>
                  </>
                ) : (
                  menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.path}
                        className="block text-white text-base py-2 px-10 hover:bg-orange-500 rounded-md"
                        onClick={() => {
                          setShowDropdown(!showDropdown);
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </OutsideClickHandler>

        <div className="flex justify-end max-md:hidden">
          {isLoggedIn ? (
            <div className="flex gap-4 justify-between items-center">
              <button
                className="bg-white text-[#89288f] border-[3px] border-[#89288f] rounded-lg px-4 py-2 hover:border-orange-500"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
              {!info.isAdmin && (
                <button
                  className="rounded-full border-[3px] border-newpurple focus:outline-none"
                  onClick={toggleProfile}
                >
                  <img
                    className="rounded-full hover:ring-[3px] ring-orange-500  border-newpurple"
                    src={profile}
                    alt="profile"
                    height={38}
                    width={38}
                  />
                  {showProfile && (
                    <Profile WindowCloseFunction={toggleProfile} />
                  )}
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-3 justify-between items-center">
              <Link
                className="flex justify-center items-center bg-white text-newpurple border-[3px] border-newpurple font-medium rounded-lg px-4 py-2 hover:border-orange-500 focus:outline-none focus:border-orange-500"
                to={"/login"}
              >
                Sign In
              </Link>
              <Link
                className="flex justify-center items-center text-white border-[3px] border-newpurple hover:border-[3px] font-medium rounded-lg px-4 py-2 hover:border-orange-500 focus:outline-none focus:border-orange-500"
                to={"/register"}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
