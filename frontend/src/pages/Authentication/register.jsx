// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [roll_no, setRoll_No] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile_No] = useState("");
  const [hostel_no, setHostel_No] = useState("");
  const [wing, setWing] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
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
          roll_no: roll_no, // by rahul
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
        console.log(response.data); // data output
        toast.success("Registration successful!");
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
    setHostel_No(e.target.value);
  };

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative mt-20">
          <div className="relative flex sm:w-full md:w-[30rem] rounded-lg border-gray-600 bg-white shadow-lg px-4">
            <div className="flex-auto px-6 py-3">
              <div className="mb-6 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <span className="flex items-center gap-2 text-[#89288f] flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
                  Sign Up
                </span>
              </div>
              <p className="mb-6 text-gray-500">
                Please sign-in to access your account
              </p>

              <form className="mb-4" method="POST">
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      id="name"
                      name="name"
                      placeholder="Enter your full name "
                      pattern="[a-zA-Z]{3,}$"
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
                      className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      id="roll_no"
                      name="roll_no"
                      placeholder="Enter your Roll number"
                      pattern="[0-9]{9}"
                      minLength={9}
                      maxLength={9}
                      required
                      onChange={(element) => setRoll_No(element.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      id="email"
                      name="email-username"
                      placeholder="Enter your email "
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
                      className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="mobile_no"
                      placeholder="Enter your phone number"
                      pattern="[0-9]{10}"
                      minLength={10}
                      maxLength={10}
                      required
                      onChange={(element) => setMobile_No(element.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
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
                        name="hostel_no"
                        value={hostel_no}
                        className="block w-full cursor-pointer appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-gray-400 text-sm outline-none focus:border-orange-500 focus:bg-white"
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
                        name="wing"
                        value={wing}
                        className="block w-full cursor-pointer appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white text-gray-400 "
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
                      className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white text-gray-400 focus:shadow"
                      name="room_no"
                      placeholder="Room No."
                      pattern="[0-8]([0-2][1-9]|3[012])"
                      maxLength={3}
                      required
                      onChange={(element) => setRoom(element.target.value)}
                      // style={{ appearance: "none" }}
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="mb-2 ms-1 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      placeholder="................."
                      pattern="[a-zA-Z0-9]{6,}$"
                      required
                      onChange={(element) => setPassword(element.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4 py-3">
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
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="cursor-pointer text-newpurple underline hover:text-orange-500 hover:underline-offset-2 ms-2"
                >
                  {" "}
                  Login{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
