// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("Please fill in all fields");
      return;
    }

    try {


      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
      );

      console.log(data);

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        console.log("Login successful:", data);

        navigate("/dashboard");

      } else {
        console.log("Invalid response format from server!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <div className="relative mt-20">
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-6 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <span className="flex items-center gap-2 text-[#89288f] flex-shrink-0 text-3xl font-black tracking-normal opacity-100">
                  Login
                </span>
              </div>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
                Welcome!
              </h4>
              <p className="mb-6 text-gray-500">
                Please sign-in to access your account
              </p>
              <form className="mb-4" action="#" method="POST">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Email{" "}
                  </label>
                  <input
                    type="text"
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400  py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email"
                    // autoFocus=""
                    onChange={(element) => setEmail(element.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="password"
                      id="password"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      placeholder="................."
                      onChange={(element) => setPassword(element.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4 w-full flex justify-center items-center py-3">
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
                Dont have an account yet?{" "}
                <Link
                  to="/register"
                  className="cursor-pointer text-newpurple underline hover:text-orange-500 hover:underline-offset-2 ms-2"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
