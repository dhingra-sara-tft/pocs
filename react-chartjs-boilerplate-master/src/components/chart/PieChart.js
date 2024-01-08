import React, { useState, useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2"; //eslint-disable-line
import Chart from "chart.js/auto"; // importing the Chart constructor

const PieChart = () => {
  // eslint-disable-next-line
  const [chartData, setChartData] = useState({
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    datasets: [
      {
        data: [50, 100, 70, 210],
        backgroundColor: ["blue", "green", "yellow", "purple"],
        hoverBackgroundColor: [
          "rgba(0,0,255,0.4)",
          "rgba(0,255,0,0.4)",
          "rgba(255,255,0,0.4)",
          "rgba(128,0,128,0.4)",
        ],
        hoverOffset: 4,
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
    const ctx = document.getElementById("pieChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: {
        //   scales: {
        //     x: {
        //       type: 'category',
        //       labels: chartData.labels,
        //     },
        //     y: {
        //       beginAtZero: true,
        //     },
        //   },
      },
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      chartRef.current.destroy();
    };
  }, [chartData]);

  return (
    <div style={{ width: "100%", height: "100%", margin: "0 auto" }}>
      <canvas id="pieChart"></canvas>
    </div>
  );
};

export default PieChart;
