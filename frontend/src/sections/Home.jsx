import React from "react";
import { homelogo } from "../assets/images";

const Home = () => {
  return (
    <section className="w-full min-h-screen flex flex-col xl:flex-row justify-center gap-10 max-container">
      <div className="relative flex flex-col justify-center items-start w-full xl:w-3/5 pt-28 ps-10 max-xl:padding-x">
        <h3 className="mb-6 font-palanquin font-bold text-orange-600 text-3xl max-sm:text-3xl">
          Discover IUHD: Elevating Campus Living
        </h3>

        <p className="mb-5 text-xl font-semibold">
          Welcome to IIT Dharwad's Pinnacle of Campus Assistance
        </p>

        <p className="mb-10 text-md text-gray-600 leading-relaxed text-wrap sm:max-w-lg">
          Embark on a transformative journey with the IITdh Unified HelpDesk
          (IUHD), where cutting-edge technology converges with the heartbeat of
          our campus. IUHD is not just a platform; it's your passport to a
          seamlessly connected and empowered campus living experience.{" "}
        </p>

        <div className="mb-5 text-wrap sm:max-w-xl">
          <p className="mb-2 font-semibold">Confidentiality Assured</p>
          <span className="text-gray-600">
            Your grievances are handled with utmost confidentiality, ensuring
            privacy and trust throughout the hostel grievance redressal process.
          </span>
        </div>

        <div className="mb-5 text-wrap sm:max-w-xl">
          <p className="mb-2 font-semibold">Easy Communication</p>
          <span className=" text-gray-600 ">
            Effortless communication is facilitated, providing a smooth and
            accessible channel for expressing and resolving grievances within
            the hostel community.
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center border-slate-400 border-2">
        <img
          src={homelogo}
          alt="Story set"
          width={500}
          height={500}
          className=" object-contain relative"
        />
      </div>
    </section>
  );
};

export default Home;
