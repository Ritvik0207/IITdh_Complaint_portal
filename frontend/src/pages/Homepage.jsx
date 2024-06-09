/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { homelogo } from "../assets/images";

const Homepage = () => {
  return (
    <section className="w-full min-h-screen grid bg-white">
      <div className="flex max-lg:flex-col max-lg:gap-10 max-sm:gap-6 pt-14">
        {/* Left Div */}
        <div className="w-full my-auto lg:w-3/5 px-8 lg:px-20 md:px-28 sm:px-20 pt-6 sm:pt-0">
          <h3 className="mb-6 font-palanquin font-bold text-orange-500 text-3xl max-xl:text-[34px] max-md:text-2xl max-sm:text-[26px] max-[400px]:text-[20px] max-[400px]:leading-7 sm:text-nowrap text-wrap">
            Discover IUHD: Elevating Campus Living
          </h3>

          <p className="mb-5 font-semibold text-xl max-md:text-lg max-sm:text-base">
            Welcome to IIT Dharwad's Pinnacle of Campus Assistance
          </p>

          <p className="mb-10 text-base max-sm:text-sm text-gray-600 leading-relaxed text-wrap">
            Embark on a transformative journey with the IITdh Unified HelpDesk
            (IUHD), where cutting-edge technology converges with the heartbeat
            of our campus. IUHD is not just a platform; it's your passport to a
            seamlessly connected and empowered campus living experience.
          </p>

          <div className="mb-5 text-wrap">
            <p className="mb-2 font-semibold max-sm:text-base">
              Confidentiality Assured
            </p>
            <span className="text-gray-600 max-sm:text-sm">
              Your grievances are handled with utmost confidentiality, ensuring
              privacy and trust throughout the hostel grievance redressal
              process.
            </span>
          </div>

          <div className="mb-5 text-wrap">
            <p className="mb-2 font-semibold max-sm:text-base">
              Easy Communication
            </p>
            <span className=" text-gray-600 max-sm:text-sm">
              Effortless communication is facilitated, providing a smooth and
              accessible channel for expressing and resolving grievances within
              the hostel community.
            </span>
          </div>
        </div>

        {/* Right Div */}
        <div className="max-w-lg lg:w-2/5 my-auto mx-auto max-md:px-6">
          <div className="rounded-sm bg-[#FFE4BA]/70 max-sm:rounded-tl-[5.5rem] max-sm:rounded-br-[5.5rem] rounded-tl-[7.5rem] rounded-br-[7.5rem]">
            <img
              src={homelogo}
              alt="Community Logo"
              className="w-auto h-auto object-cover sm:p-10 p-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
