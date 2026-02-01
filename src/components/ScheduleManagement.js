
import React, { useState, useEffect } from "react";

function TeacherManagement({ subjects = [], teachers = [], setTeachers }) {
  const [name, setName] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  // Auto-clear message after 2 seconds
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  // Toggle subject selection
  const toggleSubject = (sub) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  // Add teacher
  const handleAddTeacher = () => {
    const trimmedName = name.trim();

    // Validation: teacher name cannot be empty
    if (!trimmedName) {
      setMsg("Teacher name cannot be empty");
      setIsError(true);
      return;
    }

    // Validation: duplicate teacher
    const duplicate = teachers.some(
      (t) => t.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicate) {
      setMsg("Teacher already exists");
      setIsError(true);
      return;
    }

    // Validation: must select at least 1 subject
    if (selectedSubjects.length < 1) {
      setMsg("Select at least 1 subject");
      setIsError(true);
      return;
    }

    // Add teacher
    setTeachers((prev) => [
      ...prev,
      { name: trimmedName, subjects: selectedSubjects },
    ]);

    setName("");
    setSelectedSubjects([]);
    setMsg("Teacher added successfully");
    setIsError(false);
  };

  return (
    <div className="teacher-management">
      <h2>Teacher Management</h2>

      {msg && (
        <p style={{ color: isError ? "red" : "green", fontWeight: "bold" }}>
          {msg}
        </p>
      )}

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Teacher Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <h4>Select Subjects</h4>
      {subjects.length === 0 && <p>No subjects available</p>}

      <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ccc", padding: "5px" }}>
        {subjects.map((sub, i) => (
          <label key={i} style={{ display: "block", marginBottom: "4px" }}>
            <input
              type="checkbox"
              checked={selectedSubjects.includes(sub)}
              onChange={() => toggleSubject(sub)}
            />{" "}
            {sub}
          </label>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleAddTeacher}>Add Teacher</button>
      </div>

      <hr />

      <h3>Teacher List</h3>
      {teachers.length === 0 ? (
        <p>No teachers added</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Teacher Name</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{t.name}</td>
                <td>{t.subjects.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TeacherManagement;


