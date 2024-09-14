/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaTimesSolid } from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";
import OutsideClickHandler from "react-outside-click-handler";
import Profile from "./Profile";

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
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("userInfo"); // Clear userInfo from localStorage
    navigate("/"); // Navigate to the login page
    setLoggedIn(false);
  };

  return (
    <header className="py-1.5 fixed z-50 w-full bg-newpurple lg:px-16 md:px-12 sm:px-9 px-2">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to={"/"}
          className="flex gap-1.5 h-auto focus:outline-none scale-[85%]"
          tabIndex="-1"
        >
          <img
            src="/assets/icons/logo1.png"
            alt="college logo"
            width={40}
            className="rounded inline-block bg-slate-50"
          />
          <img
            src="/assets/icons/logo2.png"
            alt="college name"
            width={200}
            className="inline-block"
          />
        </Link>

        <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
          <div className="md:hidden block">
            <button
              className="p-4 rounded-full outline-none hover:ring-2 hover:ring-orange-500  focus-visible:ring-orange-500 relative"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <RxHamburgerMenu
                size={20}
                color="white"
                className={`transition-all duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  showDropdown ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                } `}
              />

              <LiaTimesSolid
                size={20}
                color="white"
                className={`transition-all duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  showDropdown ? "opacity-100 rotate-180" : "opacity-0 rotate-0"
                } `}
              />
            </button>

            <ul
              className={`bg-newpurple absolute top-full right-1 mt-[1px] rounded text-center divide-y-2 transition-all duration-300 ${
                showDropdown
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0 pointer-events-none"
              }`}
            >
              {isLoggedIn ? (
                <>
                  <li className="w-full h-full">
                    <button
                      className="block w-full h-full text-white text-base py-2 px-10 hover:bg-orange-500 outline-none focus:bg-orange-500 rounded-t"
                      onClick={() => {
                        setShowDropdown(false);
                        setShowProfile(true);
                      }}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-white text-base py-2 px-10 hover:bg-orange-500 outline-none focus:bg-orange-500 rounded-b inline-flex items-center"
                      onClick={() => {
                        handleSignOut();
                        setShowDropdown(false);
                      }}
                    >
                      <IoLogOutOutline className="mr-1.5" size={20} />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="block text-white text-base py-2 px-10 hover:bg-orange-500 rounded outline-none focus:bg-orange-500"
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
          </div>
        </OutsideClickHandler>

        {showProfile && <Profile setShowProfile={setShowProfile} />}

        <div className="flex justify-end max-md:hidden">
          {isLoggedIn ? (
            <div className="flex flex-row-reverse gap-4 justify-between items-center">
              <button
                className="bg-white text-newpurple font-medium rounded px-4 py-2 outline-none hover:ring-2 hover:ring-orange-500"
                onClick={handleSignOut}
              >
                Logout
              </button>
              {!info.isAdmin && (
                <>
                  <button
                    className="rounded-full outline-none hover:ring-2 hover:ring-orange-500"
                    onClick={() => setShowProfile((curr) => !curr)}
                  >
                    <img
                      className="rounded-full hover:ring-[3px] ring-orange-500  border-newpurple"
                      src="/assets/icons/profile.png"
                      alt="profile"
                      height={38}
                      width={38}
                    />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                className="bg-white text-newpurple font-medium rounded px-4 py-2 outline-none hover:ring-2 hover:ring-orange-500"
                to={"/login"}
              >
                Login
              </Link>
              <Link
                className="text-white font-medium rounded px-4 py-2 outline-none hover:ring-2 hover:ring-orange-500 ring-offset-0"
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
