import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2"; // eslint-disable-line no-unused-vars
import Chart from "chart.js/auto"; // importing the Chart constructor

const LineChart = () => {
  // eslint-disable-next-line
  const [chartData, setChartData] = useState({
    labels: [
      "Label 1",
      "Label 2",
      "Label 3",
      "Label 4",
      "Label 5",
      "Label 6",
      "Label 7",
    ],
    datasets: [
      {
        label: "Sample Data",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  });

  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart before rendering a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart
    const ctx = document.getElementById("lineChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        // scales: {
        //   x: {
        //     type: 'category',
        //     labels: chartData.labels,
        //   },
        //   y: {
        //     beginAtZero: true,
        //   },
        // },
      },
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      chartRef.current.destroy();
    };
  }, [chartData]);

  return (
    <div style={{ width: "100%", height: "100%", margin: "0 auto" }}>
      <canvas id="lineChart"></canvas>
    </div>
  );
};

export default LineChart;
