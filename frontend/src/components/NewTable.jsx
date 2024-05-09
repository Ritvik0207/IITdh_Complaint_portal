import React, { useEffect, useState } from "react";
import data from "./data.json";
import Resizetable from "./resizetable";
import Graph from "./graph";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { TbAxisX, TbAxisY } from "react-icons/tb";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "react-toastify";
import Modal from "react-modal";

const { headers, rows } = data;

const initialColumns = headers.map((header) => ({
  Header: header,
  accessor: header,
  width: 120,
}));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "auto",
    padding: "10px",
    borderRadius: "25px",
    border: "3px solid #ff661a",
  },
};

Modal.setAppElement("#root");

const firstRow = rows[0];
const numericalHeaders = headers.filter((header, index) => {
  const value = firstRow[index];
  return (
    !isNaN(value) &&
    value !== "" &&
    value !== null &&
    value !== undefined &&
    value !== "\n"
  );
});

function NewTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [columns, setColumns] = useState(initialColumns);
  const [isDropdownOpenX, setIsDropdownOpenX] = useState(false);
  const [isDropdownOpenY, setIsDropdownOpenY] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [graphData, setGraphData] = useState([null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectXAxis = (header) => {
    setX(header);
    setIsDropdownOpenX(false);
  };

  const selectYAxis = (header) => {
    setY(header);
    setIsDropdownOpenY(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevDropdownVisible) => !prevDropdownVisible);
  };

  const toggleDropdownX = () => {
    setIsDropdownOpenX((prevIsDropdownOpenX) => !prevIsDropdownOpenX);
  };

  const toggleDropdownY = () => {
    setIsDropdownOpenY((prevIsDropdownOpenY) => !prevIsDropdownOpenY);
  };

  const handleTagClick = (header) => {
    setTags((prevTags) => {
      if (prevTags.includes(header)) {
        return prevTags.filter((tag) => tag !== header);
      } else {
        return [...prevTags, header];
      }
    });
  };

  const handleOkClick = () => {
    setDropdownVisible(false);
    if (tags.length == 0) {
      setColumns(initialColumns);
    } else {
      const newColumns = tags.map((tag) => ({
        Header: tag,
        accessor: tag,
        width: 120,
      }));
      setColumns(newColumns);
    }
  };

  const handleGenerateClick = () => {
    if (x === null || y === null) {
      toast.warning("Please select both X-axis and Y-axis");
    } else if (x === y) {
      toast.warning("X-axis and Y-axis cannot be the same");
    } else {
      setGraphData([x, y]);
      setIsModalOpen(true);
    }
  };

  // useEffect(() => {
  //   console.log(graphData);
  // }, [graphData]);

  const contents = rows.map((row) => {
    let obj = {};
    row.forEach((value, index) => {
      obj[headers[index]] = value;
    });
    return obj;
  });

  const filteredContents = contents.filter((content) =>
    Object.values(content).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <div className="flex justify-start items-center gap-2 w-auto pt-28 mx-8">
        <div className="flex items-center relative">
          <label className="absolute left-1 p-1.5" htmlFor="search">
            <div className="p-1 bg-white rounded-md shadow-md">
              <FaSearch size={12} />
            </div>
          </label>
          <input
            type="search"
            name="search"
            className="flex h-auto rounded-xl border px-3 py-2 text-sm pl-10 w-60 bg-gray-100 text-gray-400 focus-:outline-none focus:ring-1  focus:ring-offset-0 focus:outline-none shadow-md"
            value={searchTerm}
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center relative cursor-pointer">
          <div className="absolute left-1 p-1.5">
            <div className="p-1 bg-white rounded-md shadow-md">
              <FaPlus size={12} />
            </div>
          </div>
          <OutsideClickHandler onOutsideClick={() => setDropdownVisible(false)}>
            <input
              type="button"
              name="tags"
              className="flex h-auto rounded-xl border px-3 py-2 text-sm pl-10 w-40 bg-gray-100 text-gray-400 focus-visible:outline-none focus:ring-1 focus:ring-offset-0 focus:outline-none shadow-md cursor-pointer"
              value="Tags"
              onClick={toggleDropdown}
            />
            {dropdownVisible && (
              <div className="flex flex-col items-start gap-1 absolute top-full mt-2 w-44 bg-white border rounded-xl shadow-md px-2 py-2 z-30">
                {headers.map((header) => (
                  <div
                    key={header}
                    className="flex justify-start items-center gap-1 w-full px-2 py-0.5 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 h-3.5 w-3.5 focus:outline-none"
                      id={header}
                      name={header}
                      onChange={() => handleTagClick(header)}
                      checked={tags.includes(header)}
                    />
                    <label className="w-full" htmlFor={header}>
                      {header}
                    </label>
                  </div>
                ))}
                <div className="flex justify-center mt-2 items-center w-full">
                  <button
                    className="rounded-md border px-3 py-1 w-3/4 text-sm bg-gray-300 text-gray-600 focus-visible:outline-none focus:ring-1 focus:ring-offset-0 focus:outline-none hover:shadow-md hover:bg-green-300/70 transition-colors"
                    onClick={handleOkClick}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </OutsideClickHandler>
        </div>
        <button
          className="flex w-auto h-auto rounded-full p-2 bg-gray-100 border-2 border-transparent focus-visible:outline-none hover:border-2 hover:border-gray-300 focus:outline-none shadow-md"
          title="Reset Tags"
          onClick={() => {
            setColumns(initialColumns);
            setSearchTerm("");
          }}
        >
          <BsArrowCounterclockwise size={16} />
        </button>
        <div className="flex justify-start items-center ms-10">
          <span className="font-roboto text-lg me-2">Graph: </span>
          <div className="flex items-center relative cursor-pointer">
            <div className="absolute left-4 p-1 bg-white rounded-md shadow-md">
              <TbAxisX size={12} />
            </div>
            <OutsideClickHandler
              onOutsideClick={() => setIsDropdownOpenX(false)}
            >
              <input
                type="button"
                className="flex w-44 h-auto rounded-xl p-2 bg-gray-100 
                focus-visible:outline-none focus:ring-1 focus:ring-offset-0 focus:outline-none shadow-md pl-12 text-gray-400 cursor-pointer"
                value={`${x === null ? "X-axis" : x}`}
                onClick={toggleDropdownX}
              />
              {isDropdownOpenX && (
                <div className="flex flex-col items-start gap-1 absolute top-full mt-2 w-44 bg-white border rounded-xl shadow-md px-2 py-2 z-30">
                  {numericalHeaders.map((header) => (
                    <div
                      key={header}
                      className="flex justify-start items-center gap-1 w-full px-2 py-0.5 hover:bg-gray-100 rounded-md"
                    >
                      <input
                        type="radio"
                        className="me-1 h-3.5 w-3.5 focus:outline-none cursor-pointer"
                        id={header}
                        name="xAxis"
                        value={header}
                        checked={x === header}
                        onChange={() => selectXAxis(header)}
                      />
                      <label className="w-full cursor-pointer" htmlFor={header}>
                        {header}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </OutsideClickHandler>
          </div>
          <span className="font-bold font-roboto mx-3 ">Vs</span>
          <div className="flex items-center relative cursor-pointer">
            <div className="absolute left-4 p-1 bg-white rounded-md shadow-md">
              <TbAxisY size={12} />
            </div>
            <OutsideClickHandler
              onOutsideClick={() => setIsDropdownOpenY(false)}
            >
              <input
                type="button"
                className="flex w-44 h-auto rounded-xl p-2 bg-gray-100 
                focus-visible:outline-none focus:ring-1 focus:ring-offset-0 focus:outline-none shadow-md pl-12 text-gray-400 cursor-pointer"
                value={`${y === null ? "Y-axis" : y}`}
                onClick={toggleDropdownY}
              />
              {isDropdownOpenY && (
                <div className="flex flex-col items-start gap-1 absolute top-full mt-2 w-44 bg-white border rounded-xl shadow-md px-2 py-2 z-30">
                  {numericalHeaders.map((header) => (
                    <div
                      key={header}
                      className="flex justify-start items-center gap-1 w-full px-2 py-0.5 hover:bg-gray-100 rounded-md"
                    >
                      <input
                        type="radio"
                        className="me-1 h-3.5 w-3.5 focus:outline-none cursor-pointer"
                        id={header}
                        name="yAxis"
                        value={header}
                        checked={y === header}
                        onChange={() => selectYAxis(header)}
                      />
                      <label className="w-full cursor-pointer" htmlFor={header}>
                        {header}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </OutsideClickHandler>
          </div>
        </div>
        <button
          className="flex w-auto h-auto rounded-full p-2 ms-2 bg-gray-100 border-2 border-transparent focus-visible:outline-none hover:border-2 hover:border-gray-300 focus:outline-none shadow-md"
          title="Generate Graph"
          onClick={handleGenerateClick}
        >
          <GoGraph size={16} />
        </button>
      </div>

      <Resizetable columns={columns} filteredData={filteredContents} />

      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Graph Modal"
      >
        <div
          className={`flex justify-center items-center my-6 ${
            graphData[0] !== null && graphData[1] !== null ? "block" : "none"
          }`}
        >
          {graphData[0] !== null && graphData[1] !== null && (
            <Graph data={contents} xAxis={graphData[0]} yAxis={graphData[1]} />
          )}
        </div>
      </Modal>
    </>
  );
}

export default NewTable;
