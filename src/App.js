import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";
import SubjectManagement from "./components/subject";
import CourseManagement from "./components/course";
import BatchManagement from "./components/batch";
import StudentManagement from "./components/student";
import TeacherManagement from "./components/teacher";
import TeacherAllocation from "./components/TeacherAllocation";
import Email from "./components/Email";

import { coursesList, teachersList } from "./data";
import "./App.css";

function App() {
  // Helper to read from localStorage
  const getLocalStorage = (key, fallback) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  };

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(
    getLocalStorage("isAuthenticated", false)
  );

  const [activeTab, setActiveTab] = useState("Dashboard");

  // App data
  const [subjects, setSubjects] = useState(getLocalStorage("subjects", []));
  const [courses, setCourses] = useState(getLocalStorage("courses", coursesList));
  const [batches, setBatches] = useState(getLocalStorage("batches", []));
  const [students, setStudents] = useState(getLocalStorage("students", []));
  const [teachers, setTeachers] = useState(getLocalStorage("teachers", teachersList));

  // Save to localStorage
  useEffect(() => localStorage.setItem("subjects", JSON.stringify(subjects)), [subjects]);
  useEffect(() => localStorage.setItem("courses", JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem("batches", JSON.stringify(batches)), [batches]);
  useEffect(() => localStorage.setItem("students", JSON.stringify(students)), [students]);
  useEffect(() => localStorage.setItem("teachers", JSON.stringify(teachers)), [teachers]);
  useEffect(() => localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated)), [isAuthenticated]);

  // Dashboard content switch
  const renderDashboardContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard subjects={subjects} courses={courses} batches={batches} students={students} />;
      case "Subjects":
        return <SubjectManagement
          subjects={subjects}
          setSubjects={setSubjects}
          batches={batches}
          courses={courses}
          teachers={teachers}   // ✅ ADD THIS
        />

      case "Courses":
        return <CourseManagement subjects={subjects} courses={courses} setCourses={setCourses} />;
      case "Batches":
        return <BatchManagement courses={courses} batches={batches} setBatches={setBatches} />;
      case "Students":
        return <StudentManagement courses={courses} batches={batches} students={students} setStudents={setStudents} />;
      case "Teachers":
        return <TeacherManagement subjects={subjects} teachers={teachers} setTeachers={setTeachers} />;
      case "Allocation":
        return <TeacherAllocation batches={batches} courses={courses} teachers={teachers} />;
      default:
        return null;
    }
  };

  return (
    <Routes>
      {/* LOGIN PAGE */}
      <Route
        path="/"
        element={<Email onLoginSuccess={() => setIsAuthenticated(true)} />}
      />

      {/* DASHBOARD */}
      <Route
        path="/Email"
        element={
          isAuthenticated ? (
            <div className="dashboard-container" style={{ display: "flex", minHeight: "100vh" }}>
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="content-area" style={{ flex: 1, padding: "20px", backgroundColor: "#f5f7fa" }}>
                {renderDashboardContent()}
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
