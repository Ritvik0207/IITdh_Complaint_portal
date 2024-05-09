import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Graph = ({ data, xAxis, yAxis }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: { id: "basic-bar" },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (xAxis !== null && yAxis !== null) {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: data ? data.map((row) => row[xAxis]) : [],
        },
      }));

      setSeries([
        {
          name: yAxis,
          data: data ? data.map((row) => row[yAxis]) : [],
        },
        {
          name: xAxis,
          data: data ? data.map((row) => row[xAxis]) : [],
        },
      ]);
    }
  }, [xAxis, yAxis, data]);

  return (
    <>
      <div className="w-[500px] h-auto">
        <ReactApexChart options={chartOptions} series={series} type="line" />
      </div>
    </>
  );
};

export default Graph;
