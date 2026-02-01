import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    "Dashboard",
    "Subjects",
    "Courses",
    "Batches",
    "Students",
    "Teachers",
    "Allocation",
  ];

  return (
    <div className="sidebar" style={{ width: 200, background: "#2c3e50", color: "#fff", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>TRAINING MANAGEMENT</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItems.map((item) => (
          <li
            key={item}
            onClick={() => setActiveTab(item)}
            style={{
              cursor: "pointer",
              padding: "10px 15px",
              marginBottom: 8,
              borderRadius: 4,
              backgroundColor: activeTab === item ? "#1abc9c" : "transparent",
              color: activeTab === item ? "#fff" : "#ecf0f1",
              fontWeight: activeTab === item ? "bold" : "normal",
              userSelect: "none",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
