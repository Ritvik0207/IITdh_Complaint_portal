// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { React, useState } from "react";

// const Majorissues = (props) => {
//   const [vote, setVote] = useState(props.voteCount);
//   const [upvote, setUpvote] = useState(false);
//   const upvotefn = () => {
//     setUpvote(true);
//     setVote(prev => prev + 1);
//   };
//   return (
//     <div className="py-6 flex flex-wrap md:flex-nowrap">
//       <div className="md:w-52 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
//         <span className="font-bold text-2xl text-gray-700 flex ms-6 overflow-hidden ">
//           {props.category}
//         </span>
//         <span className="font-semibold mt-4 text-gray-600 text-md flex ms-10">
//           {props.timestamp}
//         </span>
//       </div>
//       <div className="md:flex-grow">
//         <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
//           {props.roll_no} - {props.heading}
//         </h2>
//         <p className="leading-relaxed">{props.description}</p>
//         <div className="flex justify-end pt-4">
//           <button
//             className="flex justify-end p-2 pr-2 bg-gray-100 rounded-full cursor-pointer border-2 border-white hover:border-2 hover:border-newpurple"
//             key={props.category}
//             onClick={upvotefn}
//           >
//             {/* Upvote icon (you can replace the content inside the button with your icon) */}
//             <div className="inline-block">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-newpurple"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="4"
//                   d="M5 15l7-7 7 7"
//                 />
//               </svg>
//             </div>
//             <div className="inline-block text-newpurple font-bold">Upvote</div>
//           </button>
//           <span className="flex justify-center items-center text-md font-bold pl-4 rounded-full bg-slate-200 pr-4">
//             {props.voteCount}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Majorissues;
import React, { useState } from "react";

const Majorissues = (props) => {
  const [vote, setVote] = useState(props.voteCount);
  const [upvoted, setUpvoted] = useState(false);

  const upvotefn = () => {
    if (!upvoted) {
      setUpvoted(true);
      setVote(prev => prev + 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="font-bold text-lg text-gray-700">{props.category}</span>
          <span className="font-semibold text-sm text-gray-600 mt-1">{props.timestamp}</span>
        </div>
        <div className="flex items-center">
          <button
            className={`px-3 py-1 mr-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none transition duration-300 ${upvoted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={upvotefn}
            disabled={upvoted}
          >
            Upvote
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${upvoted ? 'text-gray-400' : 'text-white'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <span className="text-md font-bold text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
            {vote}
          </span>
        </div>
      </div>
      <h2 className="text-xl font-medium text-gray-900 mb-2">
        {props.heading}
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        <span className="font-semibold">Roll No:</span> {props.roll_no} <br />
        <span className="font-semibold">Description:</span> {props.description}
      </p>
    </div>
  );
};

export default Majorissues;
