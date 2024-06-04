/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [roll_no, setRoll_No] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile_No] = useState("");
  const [hostel_no, setHostel_No] = useState("");
  const [wing, setWing] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const navigate = useNavigate();

  const hostels = ["Hostel-1", "Hostel-2"];
  const wings = ["A", "B", "C", "D", "E"];

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

  const handleHostelChange = (e) => {
    setHostel_No(e.target.value);
  };

  const handleWingChange = (e) => {
    setWing(e.target.value);
  };

  return (
    <>
      <section className="min-h-screen w-full bg-gray-50">
        <div className="h-full w-full pt-14">
          <div className="h-full w-full flex justify-center items-center py-6">
            <div className="relative flex sm:w-[30rem] max-sm:w-[24rem] rounded-lg border-gray-600 bg-white shadow-lg">
              <div className="flex-auto px-6 py-3 max-sm:px-4">
                <div className="mb-6 flex items-center justify-center max-sm:mb-4">
                  <span className="text-newpurple text-3xl font-black tracking-normal max-sm:text-2xl">
                    Sign Up
                  </span>
                </div>
                <p className="mb-4 text-gray-500 text-base max-sm:text-xs">
                  Please sign-in to access your account
                </p>

                <form className="mb-4 px-2" method="POST">
                  <div className="mb-4 flex flex-row max-sm:flex-col sm:space-x-4 max-sm:mb-1">
                    <div className="flex-1">
                      <label
                        htmlFor="name"
                        className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        id="name"
                        placeholder="John"
                        pattern="[a-zA-Z]{3,}$"
                        title="3 letters or more"
                        required
                        onChange={(element) => setName(element.target.value)}
                      />
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="roll_no"
                        className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Roll Number
                      </label>
                      <input
                        type="text"
                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400  py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        id="roll_no"
                        placeholder="2100100**"
                        pattern="[0-9]{9}"
                        minLength={9}
                        maxLength={9}
                        required
                        onChange={(element) => setRoll_No(element.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex flex-row max-sm:flex-col sm:space-x-4 max-sm:mb-1">
                    <div className="flex-1">
                      <label
                        htmlFor="email"
                        className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        id="email"
                        name="email-username"
                        placeholder="student@iitdh.ac.in"
                        // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        required
                        onChange={(element) => setEmail(element.target.value)}
                      />
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="mobile_no"
                        className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        name="mobile_no"
                        placeholder="### - ### - ####"
                        pattern="[0-9]{10}"
                        minLength={10}
                        maxLength={10}
                        required
                        onChange={(element) =>
                          setMobile_No(element.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex flex-row space-y-0 space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="hostel_no"
                        className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Hostel No.
                      </label>
                      <div className="relative">
                        <select
                          id="hostel_no"
                          value={hostel_no}
                          className="block w-full cursor-pointer appearance-none rounded-md border border-gray-400 py-2 px-3 text-gray-400 text-sm outline-none focus:border-orange-500 focus:bg-white"
                          required
                          onChange={handleHostelChange}
                        >
                          <option value="" disabled>
                            Hostel
                          </option>
                          {hostels.map((hostel) => (
                            <option key={hostel} value={hostel}>
                              {hostel}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <FaChevronDown size={12} />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 relative">
                      <label
                        htmlFor="wing"
                        className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        WING
                      </label>
                      <div className="relative">
                        <select
                          id="wing"
                          value={wing}
                          className="block w-full cursor-pointer appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white text-gray-400 "
                          required
                          onChange={handleWingChange}
                        >
                          <option value="" disabled>
                            Wing
                          </option>
                          {wings.map((wing) => (
                            <option key={wing} value={wing}>
                              {wing}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <FaChevronDown size={12} />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="room_no"
                        className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Room
                      </label>
                      <input
                        type="tel"
                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white text-gray-400 focus:shadow"
                        placeholder="Room No."
                        pattern="[0-8]([0-2][1-9]|3[012])"
                        maxLength={3}
                        required
                        onChange={(element) => setRoom(element.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-2 flex flex-row max-sm:flex-col sm:space-x-4 max-sm:mb-1">
                    <div className="flex-1">
                      <label
                        htmlFor="password"
                        className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Set Password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type={`${isVisible ? "text" : "password"}`}
                          className="w-full block cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                          id="password"
                          placeholder="•••••"
                          // pattern="[a-zA-Z0-9]{6,}$"
                          required
                          onChange={(element) =>
                            setPassword(element.target.value)
                          }
                        />
                        <button
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

                    <div className="flex-1">
                      <label
                        htmlFor="confirmPassword"
                        className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type={`${isConfirmVisible ? "text" : "password"}`}
                          className="w-full block cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                          id="confirmPassword"
                          placeholder="•••••"
                          // pattern="[a-zA-Z0-9]{6,}$"
                          required
                          onChange={(element) =>
                            setConfirmPassword(element.target.value)
                          }
                        />
                        <button
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

                  <div className="mb-4 py-2">
                    <button
                      type="submit"
                      className="grid w-full cursor-pointer select-none rounded-md border bg-newpurple py-2 px-5 text-center align-middle text-sm font-bold text-white shadow hover:border-[#75237a] hover:bg-[#75237a] hover:text-white focus:border-[#75237a] focus:bg-[#75237a] focus:text-white focus:shadow-none tracking-wide"
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
                    className="cursor-pointer text-newpurple underline hover:text-orange-500 hover:underline-offset-2 ms-2"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
