import React, { useState, useEffect, useRef } from "react"; // eslint-disable-line

const tableData = [
    {id: 1, firstName: "John", lastName: "Doe", department: "IT", salary: 60000},
    {id: 2, firstName: "Jane", lastName: "Smith", department: "HR", salary: 55000},
    {id: 3, firstName: "Mark", lastName: "Johnson", department: "Finance", salary: 65000},
    {id: 4, firstName: "Sarah", lastName: "Williams", department: "Marketing", salary: 60000},
    {id: 5, firstName: "Chris", lastName: "Davis", department: "IT", salary: 70000}
]

const Table = () => {

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Department</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.department}</td>
            <td>{item.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
