import React from "react";
import { profile } from "../assets/images";
import { LiaTimesSolid } from "react-icons/lia";

const Profile = ({ WindowCloseFunction }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <section className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-85 cursor-default">
      <div className="relative max-w-md w-auto p-8 bg-white rounded-lg shadow-lg">
        <div
          onClick={WindowCloseFunction}
          className="absolute top-0 right-0 m-4 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <LiaTimesSolid size={24} />
        </div>
        <div className="flex justify-center items-center mt-8 mb-2">
          <img
            className="w-1/2 rounded-full border-2 border-orange-500"
            src={profile}
            alt="Profile"
            title={userInfo.name}
          />
        </div>
        <div className="text-center my-4">
          <h1 className="text-2xl font-semibold tracking-tighter">
            {userInfo.name}
          </h1>
        </div>
        <div className="mx-auto flex p-2 text-left">
          <div className="grid grid-cols-2">
            <div className="space-y-2 ps-4">
              <div className="font-semibold text-gray-500">Name</div>
              <div className="font-semibold text-gray-500">Email</div>
              <div className="font-semibold text-gray-500">Roll No.</div>
              <div className="font-semibold text-gray-500">Phone No.</div>
              <div className="font-semibold text-gray-500">Hostel</div>
              <div className="font-semibold text-gray-500">Wing</div>
              <div className="font-semibold text-gray-500">Room No.</div>
            </div>
            <div className="space-y-2 ps-4">
              <div className="font-semibold">{userInfo.name}</div>
              <div className="text-black font-semibold block">
                {userInfo.email}
              </div>
              <div className="text-black font-semibold block">
                {userInfo.roll_no}
              </div>
              <div className="text-black font-semibold block">
                {userInfo.mobile_number}
              </div>
              <div className="text-black font-semibold block">
                {userInfo.hostel_no}
              </div>
              <div className="text-black font-semibold block">
                {userInfo.wing}
              </div>
              <div className="text-black font-semibold block">
                {userInfo.room_no}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
