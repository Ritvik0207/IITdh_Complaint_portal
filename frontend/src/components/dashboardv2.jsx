import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { HiMiniTicket } from "react-icons/hi2";
import { MdPending } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import OutsideClickHandler from "react-outside-click-handler";
import TicketAreaGraph from "./ticketareagraph";
import TicketPieChart from "./ticketpiechart";

const Dashboard = ({ TicketCounts, Tickets }) => {
  const svgs = [
    <HiMiniTicket size={18} />,
    <MdPending size={18} />,
    <GrInProgress size={18} />,
    <IoCheckmarkDoneCircle size={18} />,
  ];
  const headers = [
    "Tickets Created",
    "Pending Tickets",
    "Resolved Tickets",
    "Rejected Tickets",
  ];
  const [counts, setCounts] = useState(TicketCounts);
  const [pieData, setPieData] = useState([0, 0, 0, 0]);
  const dateOptions = ["Today", "This week", "This month", "This year"];
  const [areaGraphData, setAreaGraphData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(dateOptions[1]);

  const getAreaGraphData = (tickets, start, end) => {
    let graphData = [];
    for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
      let openedTickets = tickets.filter((ticket) => {
        return new Date(ticket.createdAt).toDateString() === day.toDateString();
      }).length;

      let closedTickets = tickets.filter((ticket) => {
        return (
          ticket.updatedAt &&
          ticket.isDone === true &&
          new Date(ticket.updatedAt).toDateString() === day.toDateString()
        );
      }).length;

      graphData.push({ day: new Date(day), openedTickets, closedTickets });
    }
    setAreaGraphData(graphData);
    // console.log(graphData);
  };

  const filterTicketsByDate = (dateOption) => {
    setSelectedOption(dateOption);
    let ticketsCreated = [];
    let filteredTickets = Tickets.filter((ticket) => {
      let ticketCreatedDate = new Date(ticket.createdAt);
      let ticketUpdatedDate = new Date(ticket.updatedAt);
      let now = new Date();

      switch (dateOption) {
        case dateOptions[0]:
          if (ticketCreatedDate.toDateString() === now.toDateString()) {
            ticketsCreated.push(ticket);
          }
          return (
            ticketCreatedDate.toDateString() === now.toDateString() ||
            ticketUpdatedDate.toDateString() === now.toDateString()
          );
        case dateOptions[1]:
          let startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          startOfWeek.setHours(0, 0, 0, 0);
          let endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));
          endOfWeek.setHours(23, 59, 59, 999);
          if (
            ticketCreatedDate >= startOfWeek &&
            ticketCreatedDate < endOfWeek
          ) {
            ticketsCreated.push(ticket);
          }
          return (
            (ticketCreatedDate >= startOfWeek &&
              ticketCreatedDate < endOfWeek) ||
            (ticketUpdatedDate >= startOfWeek && ticketUpdatedDate < endOfWeek)
          );
        case dateOptions[2]:
          if (
            ticketCreatedDate.getFullYear() === now.getFullYear() &&
            ticketCreatedDate.getMonth() === now.getMonth()
          ) {
            ticketsCreated.push(ticket);
          }
          return (
            (ticketCreatedDate.getFullYear() === now.getFullYear() &&
              ticketCreatedDate.getMonth() === now.getMonth()) ||
            (ticketUpdatedDate.getFullYear() === now.getFullYear() &&
              ticketUpdatedDate.getMonth() === now.getMonth())
          );
        case dateOptions[3]:
          if (ticketCreatedDate.getFullYear() === now.getFullYear()) {
            ticketsCreated.push(ticket);
          }
          return (
            ticketCreatedDate.getFullYear() === now.getFullYear() ||
            ticketUpdatedDate.getFullYear() === now.getFullYear()
          );
        default:
          return true;
      }
    });
    // console.log("filtered", filteredTickets);
    // console.log("created", ticketsCreated);

    if (dateOption === dateOptions[0]) {
      const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
      const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
      getAreaGraphData(filteredTickets, startOfDay, endOfDay);
    } else if (dateOption === dateOptions[1]) {
      let now = new Date();
      let startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      let endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));
      endOfWeek.setHours(23, 59, 59, 999);
      getAreaGraphData(filteredTickets, startOfWeek, endOfWeek);
    } else if (dateOption === dateOptions[2]) {
      let now = new Date();
      let startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      getAreaGraphData(Tickets, startOfMonth, now);
    } else if (dateOption === dateOptions[3]) {
      let graphData = [];
      let now = new Date();
      let start = new Date(now.getFullYear(), 0, 1);
      let end = now;
      for (
        let month = start;
        month <= end;
        month.setMonth(month.getMonth() + 1)
      ) {
        let nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
        let openedTickets = Tickets.filter(
          (ticket) =>
            new Date(ticket.createdAt) >= month &&
            new Date(ticket.createdAt) < nextMonth
        ).length;
        let closedTickets = Tickets.filter(
          (ticket) =>
            ticket.updatedAt &&
            new Date(ticket.updatedAt) >= month &&
            new Date(ticket.updatedAt) < nextMonth &&
            ticket.isDone
        ).length;
        graphData.push({
          month: new Date(month),
          openedTickets,
          closedTickets,
        });
      }
      setAreaGraphData(graphData);
    }

    setCounts([
      ticketsCreated.length,
      filteredTickets.filter(
        (ticket) =>
          (ticket.isApproved || !ticket.isApproved) &&
          !ticket.isDone &&
          !ticket.isRejected
      ).length,
      filteredTickets.filter((ticket) => ticket.isDone).length,
      filteredTickets.filter((ticket) => ticket.isRejected).length,
    ]);

    setPieData([
      filteredTickets.filter(
        (ticket) => ticket.isApproved && !ticket.isAssigned
      ).length,
      filteredTickets.filter((ticket) => ticket.isAssigned && !ticket.isDone)
        .length,
      filteredTickets.filter((ticket) => ticket.isDone).length,
      filteredTickets.filter((ticket) => ticket.isRejected).length,
    ]);
  };

  useEffect(() => {
    filterTicketsByDate(selectedOption);
  }, [selectedOption]);

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="w-full h-56 bg-gray-200/20 flex flex-col border-b-2 border-gray-200">
          <div className="text-xl h-auto font-montserrat font-semibold pt-6 py-2 px-8 flex justify-start items-center">
            Insights
            <OutsideClickHandler onOutsideClick={() => setDropdownOpen(false)}>
              <div className="relative ">
                <button
                  className="text-newpurple/75 text-xs ps-4"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {selectedOption} ▼
                </button>
                {dropdownOpen && (
                  <div className="flex flex-col items-start justify-center gap-0.5 absolute top-5 left-2 mt-2 w-auto text-nowrap bg-white border rounded-md shadow-md p-1.5 z-30 text-xs">
                    {dateOptions.map(
                      (header, index) =>
                        header !== selectedOption && (
                          <button
                            className="w-full h-full text-left hover:bg-newpurple/5 px-2 py-0.5 rounded-md "
                            key={index}
                            onClick={() => {
                              filterTicketsByDate(header);
                              setDropdownOpen(false);
                            }}
                          >
                            {header}
                          </button>
                        )
                    )}
                  </div>
                )}
              </div>
            </OutsideClickHandler>
          </div>
          <div className="flex justify-evenly items-center h-full">
            {headers.map((header, index) => (
              <div
                key={index}
                className="w-1/5 h-auto border-2 rounded-md bg-white p-2 flex flex-col"
              >
                <div className="rounded-sm px-2 h-full bg-gray-200/50 flex items-center">
                  <div className="flex items-center w-full h-full">
                    <div className="w-3/4 h-auto flex flex-col justify-between items-center ps-2 pb-2">
                      <div className="w-full text-sm align-top py-2 font-montserrat font-semibold text-gray-600 text-nowrap">
                        {header}
                      </div>
                      <div className="w-full text-lg font-montserrat font-bold ps-1">
                        {counts && counts[index] ? counts[index] : "0"}
                      </div>
                    </div>
                    <div className="w-1/4 text-newpurple/75 flex justify-center items-center h-full">
                      <div className="p-2.5 bg-newpurple/10 rounded-md">
                        {svgs[index]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-2/3 flex flex-row justify-start relative">
          <div className="w-[65%] px-8 border-r-2 border-gray-200">
            <div className="flex justify-start items-center py-4 gap-4">
              <div className="font-semibold font-montserrat text-[25px] text-gray-700 px-4">
                Tickets Overview
              </div>
              <div className="text-sm font-semibold text-newpurple/75 flex items-center justify-between gap-1">
                <GoDotFill size={16} /> Tickets Created
              </div>
              <div className="text-sm font-semibold text-neworange/95 flex items-center justify-between gap-1">
                <GoDotFill size={16} /> Tickets Resolved
              </div>
            </div>
            <TicketAreaGraph
              data={areaGraphData}
              selectedOption={selectedOption}
            />
          </div>

          <div className="w-[35%] px-4 py-0 absolute top-0 right-0">
            <div className="flex justify-start items-center py-4">
              <div className="font-semibold font-montserrat text-[25px] text-gray-700 px-4">
                Tickets Progress
              </div>
            </div>
            <TicketPieChart data={pieData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
