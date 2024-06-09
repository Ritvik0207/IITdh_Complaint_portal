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
        { email, password, checkbox }
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
    <section className="h-screen w-full sm:bg-gray-50 select-none">
      <div className="h-full pt-14">
        <div className="h-full flex justify-center items-center">
          <div className="flex sm:w-[28rem] rounded-lg bg-white shadow-lg px-4 max-phone:shadow-none">
            <div className="flex-auto sm:p-6 py-2">
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
                {/* Email Input Field */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="w-fit inline-block mb-2 text-xs font-medium uppercase text-gray-700"
                  >
                    Email
                  </label>

                  <div className="relative flex items-center">
                    <div className="absolute left-4 pointer-events-none">
                      <IoIosMail className="text-gray-500" size={20} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className="inline-block w-full rounded-md border border-gray-400 py-2 px-3 ps-11 text-sm outline-none focus:border-orange-500 focus:text-gray-600 focus:shadow-md"
                      placeholder="student@iitdh.ac.in"
                      onChange={(element) => setEmail(element.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Input Field */}
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="w-fit inline-block mb-2 text-xs font-medium uppercase text-gray-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="mb-2 font-medium text-sm text-orange-500 focus:underline focus:outline-none hover:underline underline-offset-2 me-2"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative flex items-center">
                    <div className="absolute left-4 pointer-events-none">
                      <RiLockPasswordFill className="text-gray-500" size={18} />
                    </div>

                    <input
                      id="password"
                      type={`${isVisible ? "text" : "password"}`}
                      className="inline-block w-full rounded-md border border-gray-400 py-2 px-3 ps-11 text-sm outline-none focus:border-orange-500 focus:text-gray-600 focus:shadow-md"
                      placeholder="•••••••"
                      onChange={(element) => setPassword(element.target.value)}
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

                {/* Remember Me Checkbox */}
                <div className="mb-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      tabIndex="-1"
                      id="checkbox"
                      type="checkbox"
                      value={checkbox}
                      className="sr-only peer"
                      onChange={() => {
                        setCheckbox(!checkbox);
                      }}
                    />
                    <div className="relative w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-1 after:start-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                    <span className="ps-2 text-sm font-medium text-gray-500 peer-focus:border-orange-500">
                      Remember me
                    </span>
                  </label>
                </div>

                {/* Sign In Button */}
                <div className="mb-4 py-2">
                  <button
                    type="submit"
                    className="w-full py-2 px-5 text-center text-sm text-white font-bold select-none rounded-md bg-newpurple hover:bg-[#75237a] focus:bg-[#75237a] shadow-md border hover:border-[#75237a] focus:border-[#75237a] focus:outline-none tracking-wide"
                    onClick={onSubmit}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              {/* Register Link */}
              <p className="mb-4 text-center">
                Don't have an account yet?
                <Link
                  to="/register"
                  className="cursor-pointer text-newpurple underline hover:text-orange-500 hover:underline-offset-2 ms-2 max-phone:inline-block transition-all"
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
