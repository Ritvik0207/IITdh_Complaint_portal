import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGear } from "react-icons/fa6";

const Home2 = () => {
  const [gearFixed, setGearFixed] = useState(false);
  return (
    <div className="min-h-dvh w-full grid">
      <header className="fixed h-14 bg-green-400 rounded-xl top-4 right-6 left-6">
        <nav className="flex justify-between items-center h-full px-4">
          <Link
            href="/"
            className="flex h-fit focus:outline-none"
            tabIndex="-1"
          >
            <img
              src="/assets/icons/logo1.png"
              alt="college logo"
              width={40}
              className="rounded-[4px] inline-block bg-slate-50 scale-[80%]"
            />
            <img
              src="/assets/icons/logo2.png"
              alt="college name"
              width={200}
              className="inline-block -ms-5 scale-[80%]"
            />
          </Link>
          <div className="flex items-center gap-3">
            <button className="text-lg text-white py-2 px-4 bg-indigo-500 outline-none rounded-lg whitespace-nowrap">
              Login
            </button>
            <button className="text-lg text-white py-2 px-4 bg-indigo-500 outline-none rounded-lg">
              Register
            </button>
          </div>
        </nav>
      </header>

      <main className="w-full h-screen flex justify-center items-center">
        <h1 className="text-8xl font-bold font-palanquin text-center">
          You are <span className="text-indigo-500 italic">One</span> step away
          from <br />{" "}
          <span
            className={`inline-block cursor-pointer transform ${
              !gearFixed && "rotate-[15deg]"
            } origin-left transition-transform duration-300 hover:-rotate-[0deg] me-5 group relative`}
            onClick={() => {
              setGearFixed(true);
            }}
          >
            Solving{" "}
            <span className="absolute -right-2 -bottom-4 opacity-0 group-hover:opacity-100 delay-300 transition-opacity duration-200 group-active:animate-spin">
              <FaGear size={20} className="text-orange-500" />
            </span>
          </span>
          your problem
        </h1>
      </main>
    </div>
  );
};

export default Home2;
