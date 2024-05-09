import React, { useState } from "react";
import data from "./data.json";
import { HiChevronDoubleUp, HiChevronDoubleDown } from "react-icons/hi";

const NewTablev2 = () => {
  const { headers, rows } = data;
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (rowIndex) => {
    const newExpandedRows = [...expandedRows];
    const indexInExpandedRows = newExpandedRows.indexOf(rowIndex);
    if (indexInExpandedRows === -1) {
      newExpandedRows.push(rowIndex);
    } else {
      newExpandedRows.splice(indexInExpandedRows, 1);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="pt-28 min-h-screen w-full">
      <table className="border-2 border-gray-100 mx-8">
        <thead className="bg-gray-100">
          <tr>
            <td className="border-2 border-gray-100"></td>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-2 border-gray-100 px-4 py-2 leading-8 text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-r-0 border-2 border-gray-200 ps-2">
                <button
                  className="rounded-full border-1 border-transparent focus:ring-2 focus:ring-gray-300 p-0.5 focus:outline-none"
                  onClick={() => toggleRow(rowIndex)}
                >
                  {expandedRows.includes(rowIndex) ? (
                    <HiChevronDoubleUp color="#808080" />
                  ) : (
                    <HiChevronDoubleDown color="#808080" />
                  )}
                </button>
              </td>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="
                    border-2 border-gray-200 px-4 py-3 border-l-0
                    text-center"
                >
                  <div
                    className="h-auto"
                    style={{
                      width: `${Math.min(15, cell.length)}ch`,
                      overflow: expandedRows.includes(rowIndex)
                        ? "visible"
                        : "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: expandedRows.includes(rowIndex)
                        ? "normal"
                        : "nowrap",
                    }}
                  >
                    {cell}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewTablev2;
