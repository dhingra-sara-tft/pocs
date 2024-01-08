import React, { useState, useEffect } from "react"; // eslint-disable-line
import { Bar, Pie, Line } from "react-chartjs-2"; // eslint-disable-line

import BarChart from "../components/chart/BarChart";
import LineChart from "../components/chart/LineChart";
import DoughnutChart from "../components/chart/DoughnutChart";
// @ts-ignore  
import PieChart from "../components/chart/PieChart"; 

import Table from "../components/common/Table";

const Dashboard = () => {
  useEffect(() => {
    // Fetch data or update chartData as needed
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="chart-container">
        <div className="chart-item">
          <h2>Bar Chart</h2>
          <BarChart />
        </div>
        <div className="chart-item">
          <h2>Line Chart</h2>
          <LineChart />
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-item">
          <h2>Doughnut Chart</h2>
          <DoughnutChart />
        </div>

        <div className="chart-item">
          <h2>Pie Chart</h2>
          <PieChart />
        </div>
      </div>

      <div className="table-container">
        <h2>Data Table</h2>
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
