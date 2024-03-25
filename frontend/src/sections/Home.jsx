import React from "react";
import { homelogo } from "../assets/images";

const Home = () => {
  return (
    <section className="w-full min-h-screen flex flex-row max-lg:flex-col justify-center gap-4">
      <div className="relative flex flex-col justify-center items-start w-full max-lg:px-28 lg:w-3/5 pt-28 lg:px-20 max-[600px]:px-12">
        <h3 className="mb-6 font-palanquin font-bold text-orange-500 text-3xl max-xl:text-[34px] max-md:text-2xl">
          Discover IUHD: Elevating Campus Living
        </h3>

        <p className="mb-5 text-xl font-semibold max-md:text-lg">
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

      <div className="relative flex flex-1 justify-center items-center xl:min-h-screen bg-primary bg-hero bg-cover bg-center border-slate-400 border-2">
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
