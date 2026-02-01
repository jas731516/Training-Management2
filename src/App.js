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
import { getData, setData } from "./utils/Storage";

import "./App.css";

function App() {
  // ======= DEFAULT DATA =======
  const defaultSubjects = [];
  const defaultCourses = coursesList;
  const defaultBatches = [];
  const defaultTeachers = teachersList;
  const defaultStudents = [];

  // ======= AUTHENTICATION =======
  const [isAuthenticated, setIsAuthenticated] = useState(
    getData("isAuthenticated", false)
  );

  const [activeTab, setActiveTab] = useState("Dashboard");

  // ======= APP DATA STATE =======
  const [subjects, setSubjects] = useState(() => getData("subjects", defaultSubjects));
  const [courses, setCourses] = useState(() => getData("courses", defaultCourses));
  const [batches, setBatches] = useState(() => getData("batches", defaultBatches));
  const [students, setStudents] = useState(() => getData("students", defaultStudents));
  const [teachers, setTeachers] = useState(() => getData("teachers", defaultTeachers));

  // ======= SAVE TO LOCALSTORAGE WHEN STATE CHANGES =======
  useEffect(() => setData("subjects", subjects), [subjects]);
  useEffect(() => setData("courses", courses), [courses]);
  useEffect(() => setData("batches", batches), [batches]);
  useEffect(() => setData("students", students), [students]);
  useEffect(() => setData("teachers", teachers), [teachers]);
  useEffect(() => setData("isAuthenticated", isAuthenticated), [isAuthenticated]);

  // ======= DASHBOARD CONTENT SWITCH =======
  const renderDashboardContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <Dashboard
            subjects={subjects}
            courses={courses}
            batches={batches}
            students={students}
          />
        );
      case "Subjects":
        return (
          <SubjectManagement
            subjects={subjects}
            setSubjects={setSubjects}
            batches={batches}
            courses={courses}
            teachers={teachers}
          />
        );
      case "Courses":
        return (
          <CourseManagement
            subjects={subjects}
            courses={courses}
            setCourses={setCourses}
          />
        );
      case "Batches":
        return (
          <BatchManagement
            courses={courses}
            batches={batches}
            setBatches={setBatches}
          />
        );
      case "Students":
        return (
          <StudentManagement
            courses={courses}
            batches={batches}
            students={students}
            setStudents={setStudents}
          />
        );
      case "Teachers":
        return (
          <TeacherManagement
            subjects={subjects}
            teachers={teachers}
            setTeachers={setTeachers}
          />
        );
      case "Allocation":
        return (
          <TeacherAllocation
            batches={batches}
            courses={courses}
            teachers={teachers}
          />
        );
      default:
        return null;
    }
  };

  // ======= APP ROUTES =======
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
            <div
              className="dashboard-container"
              style={{ display: "flex", minHeight: "100vh" }}
            >
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              <div
                className="content-area"
                style={{ flex: 1, padding: "20px", backgroundColor: "#f5f7fa" }}
              >
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
