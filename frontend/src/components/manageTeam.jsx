import React, { useState } from "react";
import { profile } from "../assets/images";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import TeamData from "./TeamData.json";

const ManageTeam = () => {
  const Image = [profile, profile, profile, profile, profile, profile];

  const [visiblePhoneIndex, setVisiblePhoneIndex] = useState(null);
  const [visibleEmailIndex, setVisibleEmailIndex] = useState(null);

  return (
    <>
      <section className="bg-white h-full w-full">
        <div className="py-6 px-4">
          <div className="mx-4 mb-4 text-left">
            <h2 className="text-2xl tracking-tight font-roboto font-bold text-gray-700">
              Our team
            </h2>
          </div>
          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {TeamData.map((item, index) => (
              <div
                className="text-center text-gray-500 dark:text-gray-400 h-60"
                key={index}
              >
                <img
                  className="mx-auto mb-2 w-36 h-36 rounded-full object-cover"
                  src={Image[index]}
                  alt={item.Name}
                />

                <h3 className="mb-1 text-xl font-semibold tracking-tight text-gray-900">
                  {item.Name}
                </h3>
                <p>{item.Post} </p>
                <ul className="flex justify-center items-center mt-1 gap-4 h-6">
                  <li>
                    <button
                      className={`hover:text-blue-700 text-blue-500 px-1 flex items-center justify-start gap-2 
                      ${
                        visiblePhoneIndex === index &&
                        "border-2 border-blue-500 rounded-2xl px-2 py-0.5"
                      }`}
                      onClick={() => {
                        setVisiblePhoneIndex(
                          visiblePhoneIndex === index ? null : index
                        );
                        setVisibleEmailIndex(null);
                      }}
                    >
                      <FaPhoneAlt size={12} />
                      {visiblePhoneIndex === index && (
                        <div className={`text-sm`}>{item.Phone}</div>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      className={`hover:text-red-700 text-red-500 px-1 flex items-center justify-start gap-2 
                      ${
                        visibleEmailIndex === index &&
                        "border-2 border-red-500 rounded-2xl px-2 py-0.5"
                      }`}
                      onClick={() => {
                        setVisibleEmailIndex(
                          visibleEmailIndex === index ? null : index
                        );
                        setVisiblePhoneIndex(null);
                      }}
                    >
                      <MdEmail size={18} />
                      {visibleEmailIndex === index && (
                        <div className="text-sm">{item.email}</div>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageTeam;
