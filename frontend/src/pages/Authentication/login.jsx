/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

const Login = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill out all the fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password }
        // also send the variable checkbox and if checked change the expiry of web token to 30 days
      );

      if (response.data.success) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        toast.success(response.data.message);
        // console.log(data); // data output
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <section className="h-screen w-full bg-gray-50">
      <div className="h-full w-full pt-14">
        <div className="h-full w-full flex justify-center items-center">
          <div className="flex flex-col sm:w-[28rem] rounded-lg bg-white shadow-lg px-4border-gray-100 max-phone:shadow-none">
            <div className="flex-auto p-6 max-sm:p-4">
              <div className="mb-6 flex items-center justify-center max-sm:mb-4">
                <span className="text-newpurple text-3xl font-black tracking-normal max-sm:text-2xl">
                  Login
                </span>
              </div>

              <h4 className="mb-2 font-medium text-xl text-gray-700 max-sm:text-base">
                Welcome!
              </h4>
              <p className="mb-6 text-gray-500 text-base max-sm:text-xs">
                Please sign-in to access your account
              </p>

              <form className="mb-4" method="POST">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700 w-full"
                  >
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 flex items-center pointer-events-none">
                      <IoIosMail className="text-gray-500" size={20} />
                    </div>
                    <input
                      type="email"
                      className="inline-block w-full cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow-md ps-11"
                      id="email"
                      placeholder="student@iitdh.ac.in"
                      // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      required
                      onChange={(element) => setEmail(element.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="password"
                      className="text-xs font-medium uppercase text-gray-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="font-medium text-sm text-orange-500 focus:underline focus:outline-none hover:underline underline-offset-2"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 flex items-center pointer-events-none">
                      <RiLockPasswordFill className="text-gray-500" size={18} />
                    </div>
                    <input
                      type={`${isVisible ? "text" : "password"}`}
                      className="inline-block w-full flex-auto cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow-md ps-11"
                      id="password"
                      placeholder="•••••"
                      // pattern="[a-zA-Z0-9]{6,}$"
                      required
                      onChange={(element) => setPassword(element.target.value)}
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

                <div className="mb-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={checkbox}
                      className="sr-only peer"
                      onChange={() => {
                        setCheckbox(!checkbox);
                      }}
                    />
                    <div className="relative w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-1 after:start-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                    <span className="ps-2 text-sm font-medium text-gray-500">
                      Remember me
                    </span>
                  </label>
                </div>

                <div className="mb-4 w-full flex justify-center items-center py-2">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border bg-newpurple py-2 px-5 text-center align-middle text-sm font-bold text-white shadow hover:border-[#75237a] hover:bg-[#75237a] hover:text-white focus:border-[#75237a] focus:bg-[#75237a] focus:text-white focus:shadow-none tracking-wide"
                    type="submit"
                    onClick={onSubmit}
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className="mb-4 text-center">
                Don't have an account yet?
                <Link
                  to="/register"
                  className="cursor-pointer text-newpurple underline hover:text-orange-500 hover:underline-offset-2 ms-2 max-phone:inline-block"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
