// Dashboard.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ subjects = [], courses = [], batches = [], students = [] }) {
  const pieData = {
    labels: ["Subjects", "Courses", "Batches", "Students"],
    datasets: [
      {
        label: "Totals",
        data: [subjects.length, courses.length, batches.length, students.length],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  const cards = [
    { label: "Total Subjects", value: subjects.length },
    { label: "Total Courses", value: courses.length },
    { label: "Total Batches", value: batches.length },
    { label: "Total Students", value: students.length }
  ];

  return (
    <div className="dashboard" style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h3 className="dashboard-title">Dashboard</h3>

      <div
        className="dashboard-cards"
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center"
        }}
      >
        {/* Pie Chart Card */}
        <div
          className="card"
          style={{
            flex: "1 1 300px",
            padding: "20px",
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 5px rgba(0,0,0,0.1)"
          }}
        >
          <h4>Overview</h4>
          <Pie data={pieData} />
        </div>

        {/* Other 4 cards */}
        {cards.map((item, index) => (
          <div
            className="card"
            key={index}
            style={{
              flex: "1 1 150px",
              padding: "20px",
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}
          >
            <p style={{ color: "#777", marginBottom: 8 }}>{item.label}</p>
            <h4>{item.value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
