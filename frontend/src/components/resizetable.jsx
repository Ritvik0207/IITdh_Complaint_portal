import React, { useState } from "react";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";

const Resizetable = ({ columns, filteredData }) => {
  const defaultColumn = React.useMemo(
    () => ({
      width: 120,
      minWidth: 100,
      maxWidth: 300,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: filteredData,
        defaultColumn,
      },
      useBlockLayout,
      useResizeColumns
    );

  return (
    <>
      <div className="pt-8">
        <table {...getTableProps()} className="inline-block mx-8 rounded-lg">
          <thead className="border-2 border-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <td
                    {...column.getHeaderProps()}
                    className="bg-gray-100 text-gray-700 font-bold font-cormorant text-lg px-3 py-2 text-center leading-8 relative"
                  >
                    <div className="overflow-hidden text-ellipsis">
                      {column.render("Header")}
                    </div>
                    <div
                      {...column.getResizerProps()}
                      className={`inline-block bg-gray-400 w-3 h-5/6 align-middle rounded-lg absolute right-[1px] top-1 transform translate-x-1/2 translate-y-1/8 touch-none ${
                        column.isResizing ? "bg-gray-600" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`inline-block bg-gray-400 w-0.5 h-full align-middle absolute right-[1px] top-0 transform translate-x-1/2 touch-none `}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className="border-2 border-gray-100">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-[#FFFFF0]/80 border-b-2 border-gray-100 last:border-b-0"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-2 py-3 border-r-2 border-gray-100 cursor-default text-nowrap text-center last:border-r-0 font-montserrat text-sm"
                    >
                      <div
                        className="overflow-hidden text-ellipsis"
                        title={cell.value}
                      >
                        {cell.render("Cell")}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Resizetable;
