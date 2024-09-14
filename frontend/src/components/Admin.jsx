import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoTicketSharp } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import Sidebar from "./Admin/Sidebar";

const Trail = () => {
  const menuItems = [
    { name: "Home", icon: <AiFillHome size={24} /> },
    { name: "Ticket", icon: <IoTicketSharp size={24} /> },
    { name: "Team", icon: <RiTeamFill size={24} /> },
  ];

  const [activeButton, setActiveButton] = useState(menuItems[0].name);

  const department = JSON.parse(localStorage.getItem("userInfo")).department;

  return (
    <div className="flex min-h-screen w-full pt-16">
      <div className="w-16 border-r-2 border-gray-200">
        <div className="h-full flex flex-col pt-28 gap-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`rounded-sm transition-colors py-1 duration-300 ${
                activeButton === item.name
                  ? "bg-newpurple/5 text-newpurple/65"
                  : "bg-white text-gray-500 hover:bg-gray-100/80"
              }`}
              onClick={() => setActiveButton(item.name)}
            >
              <div className="flex flex-col justify-center items-center py-1.5">
                {item.icon}
                <div className="font-montserrat font-bold text-xs ">
                  {item.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <section className="flex-1 flex flex-col">
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
      </section>
    </div>
  );
};

export default Trail;
