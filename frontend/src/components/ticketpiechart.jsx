import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TicketPieChart = ({ data }) => {
  const headers = [
    "Approved Tickets",
    "Assigned Tickets",
    "Resolved Tickets",
    "Rejected Tickets",
  ];
  const counts = [data[0], data[1], data[2], data[3]];

  const series = counts;
  const options = {
    labels: headers,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="pt-4">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width={400}
        height={200}
      />
    </div>
  );
};

export default TicketPieChart;
