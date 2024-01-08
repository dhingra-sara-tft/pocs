import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2"; // eslint-disable-line no-unused-vars
import Chart from "chart.js/auto"; // importing the Chart constructor

const BarChart = () => {
  // eslint-disable-next-line
  const [chartData, setChartData] = useState({
    labels: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
      "Category 6",
      "Category 7",
      "Category 8",
      "Category 9",
    ],
    datasets: [
      {
        label: "Sample Data",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
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
    const ctx = document.getElementById("barChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          x: {
            type: "category",
            labels: chartData.labels,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      chartRef.current.destroy();
    };
  }, [chartData]);

  return (
    <div style={{ width: "100%", height: "100%", margin: "0 auto" }}>
      <canvas id="barChart"></canvas>
    </div>
  );
};

export default BarChart;
