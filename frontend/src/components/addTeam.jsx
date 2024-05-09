import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OutsideClickHandler from "react-outside-click-handler";
import { Team } from "../assets/images";
import { FaPhoneAlt, FaUser, FaPlus } from "react-icons/fa";
import { MdEmail, MdLeaderboard } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const AddTeam = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [positionFocus, setPositionFocus] = useState(false);
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const Positions = [
    "Dean (SW)",
    "Associate Dean (Hostel)",
    "Faculty-in-Charge (Hostel Affairs)",
    "Warden",
    "Assistant Registrar (SW)",
    "Hostel Manager",
  ];

  const onSubmit = async (e) => {
    console.log("submitting");
    e.preventDefault();
    if (
      !name ||
      !phoneNumber ||
      !email ||
      !position ||
      !password ||
      !confirmPassword
    ) {
      toast.warning("Please fill in all required fields");
      return;
    }
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/admin/addMember",
        {
          name: name,
          phoneNumber: phoneNumber,
          email: email,
          position: position,
          password: password,
        },
        config
      );

      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.warning("Operation failed");
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white py-4">
          <div className="pb-2">
            <h3 className="text-2xl font-extrabold text-newpurple/90 text-left ps-20">
              Team
            </h3>
          </div>
          <form className="max-w-lg mx-auto pt-4">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  className="block pt-2.5 pb-1.5 px-2 w-full text-sm font-medium font-palanquin text-gray-900 bg-transparent border-b-2 border-gray-400 appearance-none focus:border-orange-500 focus:outline-none focus:ring-0 peer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                  required
                />
                <label className="absolute text-sm font-medium font-palanquin text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  <div className="flex justify-start items-center gap-1.5">
                    <FaUser />
                    Full name
                  </div>
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  className="block pt-2.5 pb-1.5 px-2 w-full text-sm font-medium font-roboto tracking-wide text-gray-900 bg-transparent border-b-2 border-gray-400 appearance-none focus:border-orange-500 focus:outline-none focus:ring-0 peer"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder=" "
                  minLength={10}
                  maxLength={10}
                  required
                />
                <label className="absolute text-sm font-medium font-palanquin text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  <div className="flex justify-start items-center gap-1.5">
                    <FaPhoneAlt />
                    Phone number
                  </div>
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  className="block pt-2.5 pb-1.5 px-2 w-full text-sm font-medium font-palanquin text-gray-900 bg-transparent border-b-2 border-gray-400 appearance-none focus:border-orange-500 focus:outline-none focus:ring-0 peer"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                />
                <label className="absolute text-sm font-medium font-palanquin text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  <div className="flex justify-start items-center gap-1.5">
                    <MdEmail />
                    Email address
                  </div>
                </label>
              </div>
              <OutsideClickHandler
                onOutsideClick={() => setPositionFocus(false)}
              >
                <div className="relative z-10 w-full group">
                  <input
                    type="text"
                    className="block pt-2.5 pb-1.5 px-2 w-full text-sm font-medium font-palanquin text-gray-900 bg-transparent border-b-2 border-gray-400 appearance-none focus:border-orange-500 focus:outline-none focus:ring-0 peer
                    "
                    onFocus={() => setPositionFocus(true)}
                    onClick={() => setPositionFocus(true)}
                    value={position}
                    onChange={(e) => {}}
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-sm font-medium font-palanquin text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    <div className="flex justify-start items-center gap-1.5">
                      <MdLeaderboard />
                      Position
                    </div>
                  </label>

                  {positionFocus && (
                    <div className="flex flex-col gap-1 absolute top-10 left-1 w-60 bg-white border rounded-md shadow-md px-2 py-2">
                      {Positions.map((item, index) => (
                        <div
                          key={item}
                          className="flex justify-start items-center gap-1 w-full py-0.5"
                        >
                          <button
                            className="w-full text-left px-3 border-2 border-transparent hover:bg-gray-100 rounded-md focus:bg-gray-100 focus:outline-none focus:ring-2 focus:rounded-sm"
                            onClick={() => {
                              setPosition(Positions[index]);
                              setPositionFocus(false);
                            }}
                          >
                            {item}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </OutsideClickHandler>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  className={`block pt-2.5 pb-1.5 px-2 w-full text-sm font-medium font-palanquin text-gray-900 bg-transparent border-b-2 border-gray-400 appearance-none focus:border-orange-500 focus:outline-none focus:ring-0 peer
                  ${
                    confirmPassword === password && confirmPassword !== ""
                      ? "border-green-500 focus:border-green-500"
                      : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  required
                />
                <label
                  className={`absolute text-sm font-medium font-palanquin text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6
                ${
                  confirmPassword === password && confirmPassword !== ""
                    ? "text-green-500 peer-focus:text-green-500"
                    : ""
                }`}
                >
                  <div className="flex justify-start items-center gap-1.5">
                    <RiLockPasswordFill />
                    Set Password
                  </div>
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  className={`block pt-2.5 pb-1.5 px-2 w-full text-sm font-medium font-palanquin text-gray-900 bg-transparent border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer
                  ${
                    confirmPassword !== password || confirmPassword === ""
                      ? "focus:border-red-500"
                      : "border-green-500 "
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder=" "
                  required
                />
                <label
                  className={`absolute text-sm font-medium font-palanquin duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
                  ${
                    confirmPassword !== password || confirmPassword === ""
                      ? " peer-focus:text-red-500"
                      : "text-green-500"
                  } text-gray-500`}
                >
                  <div className="flex justify-start items-center gap-1.5">
                    <RiLockPasswordFill />
                    Confirm Password
                  </div>
                </label>
              </div>
            </div>
            <button
              className="w-auto flex justify-start items-center gap-2 rounded-md bg-newpurple/90 py-2 px-5 mt-2 text-sm font-bold text-white shadow hover:bg-[#843788] focus:bg-[#75237a] focus:shadow tracking-wide"
              type="submit"
              onClick={onSubmit}
            >
              <FaPlus size={12} /> Add Team Member
            </button>
          </form>
        </div>
      </div>
      <div className="w-auto h-auto px-1 py-2 flex items-center ">
        <div className="rounded-sm rounded-tl-[100px] rounded-br-[100px] bg-[#FFE4BA]/70">
          <img src={Team} alt="team" className="w-96 h-96 object-cover p-4" />
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
