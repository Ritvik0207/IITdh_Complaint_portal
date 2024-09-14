import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const TicketAreaGraph = ({ data, selectedOption }) => {
  const [series, setSeries] = useState([
    {
      name: "Tickets Created",
      data: [],
    },
    {
      name: "Tickets Closed",
      data: [],
    },
  ]);

  useEffect(() => {
    if (data) {
      setSeries([
        {
          name: "Tickets Created",
          data: data.map((ticket) => ticket.openedTickets),
        },
        {
          name: "Tickets Closed",
          data: data.map((ticket) => ticket.closedTickets),
        },
      ]);
    }
  }, [data]);

  let Options = {};

  const [options, setOptions] = useState({
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["rgba(137,40,143,0.75)", "rgba(250,165,25,0.95)"],
    stroke: {
      width: 4,
      curve: "smooth",
    },
    grid: {
      show: true,
      borderColor: "#CCCCCC",
      strokeDashArray: 8,
      position: "back",
    },
    xaxis: {
      categories: Options.xaxis,
      labels: {
        style: {
          fontSize: "14px",
          fontFamily: "Montserrat, Arial, sans-serif",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      min: 0,
      forceNiceScale: true,
      labels: {
        formatter: function (val) {
          return Math.round(val);
        },
        style: {
          fontSize: "12px",
          fontFamily: "Montserrat, Arial, sans-serif",
          fontWeight: 500,
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Montserrat, Arial, sans-serif",
      colors: ["#89288f", "#FAA519"],
      fontWeight: 600,
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  });

  useEffect(() => {
    let today = new Date();
    let date = today.getDate(); // Get today's date
    let month = today.getMonth() + 1;
    if (selectedOption === "Today") {
      Options = {
        xaxis: { categories: [`${month}/${date}/${today.getFullYear()}`] },
      };
    } else if (selectedOption === "This week") {
      Options = {
        xaxis: {
          categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        },
      };
    } else if (selectedOption === "This month") {
      let dates = Array.from({ length: date }, (_, i) => `${i + 1}/${month}`);
      Options = {
        xaxis: { categories: dates },
      };
    } else if (selectedOption === "This year") {
      Options = {
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      };
    }
    setOptions(Options);
  }, [selectedOption]);

  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={260}
      />
    </>
  );
};

export default TicketAreaGraph;
