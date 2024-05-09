import React, { useState, useEffect, useContext } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { GrCompliance } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";
import { MdFiberNew, MdPendingActions } from "react-icons/md";
import Maincontent from "./maincontent";

const Sidebar = ({ activeMainLink }) => {
  const links = {
    Home: ["Dashboard", "View"],
    Ticket: [
      "New Tickets",
      "Pending Tickets",
      "Resolved Tickets",
      "Rejected Tickets",
    ],
    Team: ["Manage Team", "Add +"],
  };
  const activeLinks = links[activeMainLink];
  const svgs = [
    <MdFiberNew size={18} />,
    <MdPendingActions size={18} />,
    <GrCompliance size={18} />,
    <FiDelete size={18} />,
  ];

  const [activeSubLink, setActiveSubLink] = useState(links[activeMainLink][0]);

  useEffect(() => {
    setActiveSubLink(links[activeMainLink][0]);
  }, [activeMainLink]);

  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-1/6 h-full border-r-2 border-gray-200 p-2 rounded-sm">
          <div className="flex flex-col p-2 gap-1.5 h-full">
            <div className="flex justify-between items-center border-b-2 border-gray-200 pt-6 pb-1 mb-3">
              <div className="font-semibold font-montserrat text-lg transition-all">
                {activeMainLink}
              </div>
              <div className="font-semibold font-montserrat text-gray-500">
                <IoIosArrowDropleftCircle size={20} />
              </div>
            </div>
            {activeLinks.map((link, index) => (
              <button
                key={index}
                className={`mt-1 rounded-md transition-colors ${
                  activeSubLink === link
                    ? "bg-newpurple/5 text-newpurple/75"
                    : "bg-white text-gray-500 hover:bg-gray-100/50"
                }`}
                onClick={() => setActiveSubLink(link)}
              >
                <div className="font-montserrat font-semibold text-base flex justify-between items-center py-2.5 px-4">
                  <div className="">{link}</div>
                  {activeMainLink === "Ticket" ? (
                    <div className="p-0.5">{svgs[index]}</div>
                  ) : (
                    ""
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-5/6 h-full">
          <Maincontent activeSubLink={activeSubLink} links={links} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
