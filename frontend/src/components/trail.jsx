import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoTicketSharp } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import Sidebar from "./sidebar";

const Trail = () => {
  const links = ["Home", "Ticket", "Team"];
  const svgs = [
    <AiFillHome size={24} />,
    <IoTicketSharp size={24} />,
    <RiTeamFill size={24} />,
  ];
  const [activeButton, setActiveButton] = useState(links[0]);

  const department = JSON.parse(localStorage.getItem("userInfo")).department;

  return (
    <>
      <div className="min-h-screen min-w-full pt-14 flex overflow-hidden">
        <div className="w-16 h-auto border-r-2 border-gray-200">
          <div className="h-full flex flex-col pt-16 gap-3">
            {links.map((link, index) => (
              <button
                key={index}
                className={`rounded-sm transition-colors py-1 duration-300 ${
                  activeButton === link
                    ? "bg-newpurple/5 text-newpurple/65"
                    : "bg-white text-gray-500 hover:bg-gray-100/80"
                }`}
                onClick={() => setActiveButton(link)}
              >
                <div className="flex flex-col justify-center items-center py-1.5">
                  {svgs[index]}
                  <div className="font-montserrat font-bold text-xs ">
                    {link}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col">
          <div className="w-full h-16 border-b-2 border-gray-200 flex justify-between items-center ps-6 pe-10">
            <div className="font-montserrat font-bold text-2xl text-gray-400">
              Welcome,
              <span className="font-montserrat font-bold text-2xl ps-3 text-gray-800">
                Admin
              </span>
            </div>
            <div className="font-montserrat font-bold text-2xl">
              <span className="text-neworange px-2">{department}</span>
              Department
            </div>
          </div>

          <Sidebar activeMainLink={activeButton} />
        </div>
      </div>
    </>
  );
};

export default Trail;
