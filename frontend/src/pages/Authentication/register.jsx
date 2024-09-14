/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";

const Register = () => {
  const [name, setName] = useState("");
  const [roll_no, setRoll_No] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile_No] = useState("");
  const [hostel_no, setHostel_No] = useState("Hostel");
  const [HostelDropdown, setHostelDropdown] = useState(false);
  const [wing, setWing] = useState("Wing");
  const [WingDropdown, setWingDropdown] = useState(false);
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const navigate = useNavigate();

  const hostels = ["Hostel-1", "Hostel-2"];
  const wings = ["A", "B", "C", "D", "E"];

  const handleHostelOptionClick = (hostel) => {
    setHostel_No(hostel);
    setHostelDropdown(false);
  };

  const handleWingOptionClick = (wing) => {
    setWing(wing);
    setWingDropdown(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !roll_no ||
      !email ||
      !mobile_no ||
      !hostel_no ||
      !wing ||
      !room ||
      !password
    ) {
      toast.warning("Please fill in all required fields");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/user",
        {
          name: name,
          roll_no: roll_no,
          email: email,
          mobile_number: mobile_no,
          hostel_no: hostel_no,
          wing: wing,
          room_no: room,
          password: password,
        },
        config
      );
      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.warning("Registration failed");
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen w-full grid sm:bg-gray-50 select-none">
      <div className="h-full pt-14">
        <div className="h-full flex justify-center items-center py-6">
          <div className="flex sm:w-[30rem] rounded-lg bg-white shadow-lg px-4 max-phone:shadow-none">
            <div className="flex-auto sm:p-6 py-2">
              <div className="mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-newpurple text-2xl sm:text-3xl font-black tracking-normal">
                  Sign Up
                </span>
              </div>

              <h4 className="mb-1 font-medium text-xl text-gray-700 max-sm:text-base">
                Get Started
              </h4>
              <p className="mb-4 text-gray-500 text-xs sm:text-sm">
                Sign Up to get your account
              </p>

              <form className="mb-4" method="POST">
                <div className="sm:flex sm:flex-row flex-col gap-4 mb-0 sm:mb-2">
                  {/* Fullname Input Field */}
                  <div className="sm:w-2/3 max-sm:mb-1">
                    <label
                      htmlFor="name"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="inline-block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-orange-500 focus:text-gray-600 focus:shadow outline-none"
                      placeholder="John"
                      pattern="[a-zA-Z]{3,}$"
                      title="3 letters or more"
                      onChange={(element) => setName(element.target.value)}
                      required
                    />
                  </div>

                  {/* Roll Number Input Field */}
                  <div className="sm:w-1/3 max-sm:mb-1">
                    <label
                      htmlFor="roll_no"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Roll Number
                    </label>
                    <input
                      id="roll_no"
                      type="number"
                      className="inline-block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-orange-500 focus:text-gray-600 focus:shadow outline-none"
                      placeholder="2100100**"
                      pattern="[0-9]{9}"
                      minLength={9}
                      maxLength={9}
                      onChange={(element) => setRoll_No(element.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="sm:flex sm:flex-row flex-col gap-4 mb-0 sm:mb-2">
                  {/* Email Input Field */}
                  <div className="sm:w-2/3 max-sm:mb-1">
                    <label
                      htmlFor="email"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="inline-block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-orange-500 focus:text-gray-600 focus:shadow outline-none"
                      placeholder="student@iitdh.ac.in"
                      // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      onChange={(element) => setEmail(element.target.value)}
                      required
                    />
                  </div>

                  {/* Mobile Number Input Field */}
                  <div className="sm:w-1/3 max-sm:mb-1">
                    <label
                      htmlFor="mobile_no"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="inline-block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-orange-500 focus:text-gray-600 focus:shadow outline-none"
                      placeholder="### - ### - ####"
                      pattern="[0-9]{10}"
                      minLength={10}
                      maxLength={10}
                      required
                      onChange={(element) => setMobile_No(element.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row sm:gap-4 gap-1 mb-0 sm:mb-2 max-sm:my-2">
                  <div className="w-2/3 flex sm:gap-4 gap-1">
                    {/* Hostel Input Fields */}
                    <div className="flex-1 relative">
                      <label
                        htmlFor="hostel_no"
                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Hostel No.
                      </label>
                      <OutsideClickHandler
                        onOutsideClick={() => setHostelDropdown(false)}
                      >
                        <div className="relative">
                          <input
                            id="hostel_no"
                            type="button"
                            value={hostel_no}
                            className="inline-block w-full rounded-md border text-gray-600 border-gray-400 py-2 px-3 text-sm focus:border-orange-500 focus:shadow outline-none text-left"
                            onFocus={() => setHostelDropdown(true)}
                          />

                          <button
                            type="button"
                            onClick={() => setHostelDropdown((prev) => !prev)}
                          >
                            <IoChevronUp
                              className={`absolute right-3 max-sm:right-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 transition-transform duration-300 ${
                                HostelDropdown ? "rotate-0" : "rotate-180"
                              }`}
                            />
                          </button>
                        </div>

                        <div
                          className={`absolute space-y-1 top-full left-1/2 text-nowrap transform -translate-x-1/2 w-full bg-white border rounded-md shadow-md p-1 z-10 transition-all duration-200 
                          ${
                            HostelDropdown
                              ? "translate-y-0 opacity-100"
                              : "-translate-y-full opacity-0 pointer-events-none"
                          }`}
                        >
                          {hostels.map((item) => (
                            <div
                              key={item}
                              className="flex justify-start items-center gap-1 w-full py-0.5"
                            >
                              <button
                                type="button"
                                className="w-full text-left px-3 border-2 border-transparent hover:bg-gray-100 rounded-md focus:bg-gray-100 focus:outline-none focus:rounded-sm"
                                onClick={() => handleHostelOptionClick(item)}
                              >
                                {item}
                              </button>
                            </div>
                          ))}
                        </div>
                      </OutsideClickHandler>
                    </div>

                    {/* Wing Input Field */}
                    <div className="flex-1 relative">
                      <label
                        htmlFor="wing"
                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        WING
                      </label>
                      <OutsideClickHandler
                        onOutsideClick={() => setWingDropdown(false)}
                      >
                        <div className="relative">
                          <input
                            id="wing"
                            type="button"
                            value={wing}
                            className="inline-block w-full rounded-md border text-gray-600 border-gray-400 py-2 px-3 text-sm focus:border-orange-500 focus:shadow outline-none text-left"
                            onFocus={() => setWingDropdown(true)}
                          />
                          <button
                            type="button"
                            onClick={() => setWingDropdown((prev) => !prev)}
                          >
                            <IoChevronUp
                              className={`absolute right-3 max-sm:right-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 transition-transform duration-300 ${
                                WingDropdown ? "rotate-0" : "rotate-180"
                              }`}
                            />
                          </button>
                        </div>
                        <div
                          className={`absolute space-y-1 top-full left-full text-nowrap transform -translate-x-full w-14 bg-white border rounded-md shadow-md p-1 z-10 transition-all duration-300 
                          ${
                            WingDropdown
                              ? "translate-y-0 opacity-100"
                              : "-translate-y-full opacity-0 pointer-events-none"
                          }`}
                        >
                          {wings.map((item) => (
                            <div
                              key={item}
                              className="flex justify-start items-center w-full"
                            >
                              <button
                                type="button"
                                className="w-full text-center hover:bg-gray-100 rounded-md focus:bg-gray-100 focus:outline-none focus:rounded-sm"
                                onClick={() => handleWingOptionClick(item)}
                              >
                                {item}
                              </button>
                            </div>
                          ))}
                        </div>
                      </OutsideClickHandler>
                    </div>
                  </div>
                  <div className="w-1/3">
                    {/* Room Number Input Field */}
                    <div className="flex-1">
                      <label
                        htmlFor="room_no"
                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Room
                      </label>
                      <input
                        id="room_no"
                        type="number"
                        className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-orange-500 text-gray-600 focus:shadow outline-none"
                        placeholder="Room No."
                        pattern="[0-8]([0-2][1-9]|3[012])"
                        maxLength={3}
                        onChange={(element) => setRoom(element.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:flex sm:flex-row gap-4 mb-0 sm:mb-2">
                  {/* Password Input Field */}
                  <div className="flex-1 max-sm:mb-1">
                    <label
                      htmlFor="password"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Set Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="password"
                        type={`${isVisible ? "text" : "password"}`}
                        className="w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-orange-500 focus:text-gray-600 focus:shadow outline-none"
                        placeholder="•••••"
                        // pattern="[a-zA-Z0-9]{6,}$"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        tabIndex="-1"
                        type="button"
                        className="absolute right-4 focus:outline-none"
                        onClick={() => {
                          setIsVisible(!isVisible);
                        }}
                      >
                        {isVisible ? (
                          <FaEye className="text-gray-500" />
                        ) : (
                          <FaEyeSlash className="text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Input Field */}
                  <div className="flex-1 max-sm:mb-1">
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="confirmPassword"
                        type={`${isConfirmVisible ? "text" : "password"}`}
                        className="w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-orange-500 focus:text-gray-600 focus:shadow outline-none"
                        placeholder="•••••"
                        // pattern="[a-zA-Z0-9]{6,}$"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        tabIndex="-1"
                        type="button"
                        className="absolute right-4 focus:outline-none"
                        onClick={() => {
                          setIsConfirmVisible(!isConfirmVisible);
                        }}
                      >
                        {isConfirmVisible ? (
                          <FaEye className="text-gray-500" />
                        ) : (
                          <FaEyeSlash className="text-gray-500" />
                        )}
                      </button>
                    </div>
                    <div className="h-5">
                      {password !== confirmPassword && (
                        <div className="text-sm font-normal text-red-500 ps-1">
                          Password doesn't match
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sign Up Button */}
                <div className="mb-4 py-2">
                  <button
                    type="submit"
                    className="w-full py-2 px-5 text-center text-sm text-white font-bold select-none rounded-md bg-newpurple hover:bg-[#75237a] focus:bg-[#75237a] shadow-md border hover:border-[#75237a] focus:border-[#75237a] focus:outline-none tracking-wide"
                    onClick={onSubmit}
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <p className="mb-4 text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="cursor-pointer text-newpurple underline hover:text-orange-500 hover:underline-offset-2 ms-2 max-phone:inline-block transition-all"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
