import React, { useState, useEffect } from "react";

function TeacherManagement({ subjects = [], teachers = [], setTeachers }) {
  const [name, setName] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  // Auto-clear message
  useEffect(() => {
    if (msg) {
      const t = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(t);
    }
  }, [msg]);

  const toggleSubject = (sub) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleAddTeacher = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setMsg("Teacher name cannot be empty");
      setIsError(true);
      return;
    }

    if ((Array.isArray(teachers) ? teachers : []).some(
      (t) => t?.name?.toLowerCase() === trimmedName.toLowerCase()
    )) {
      setMsg("Teacher already exists");
      setIsError(true);
      return;
    }

    if (selectedSubjects.length < 2) {
      setMsg("Select at least 2 subjects");
      setIsError(true);
      return;
    }

    // Always store subjects as an array
    setTeachers((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      { name: trimmedName, subjects: [...selectedSubjects] },
    ]);

    setName("");
    setSelectedSubjects([]);
    setMsg("Teacher added successfully");
    setIsError(false);
  };

  const safeJoin = (arr) => (Array.isArray(arr) ? arr.join(", ") : "");

  return (
    <div>
      <h2>Teacher Management</h2>

      {msg && (
        <p style={{ color: isError ? "red" : "green", fontWeight: "bold" }}>
          {msg}
        </p>
      )}

      <input
        type="text"
        placeholder="Teacher Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h4>Select Subjects (Min 2)</h4>

      {subjects.length === 0 && <p>No subjects available</p>}

      {subjects.map((sub, i) => (
        <label key={i} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedSubjects.includes(sub)}
            onChange={() => toggleSubject(sub)}
          />
          {sub}
        </label>
      ))}

      <button onClick={handleAddTeacher}>Add Teacher</button>

      <hr />

      <h3>Teacher List</h3>

      {(Array.isArray(teachers) ? teachers : []).length === 0 ? (
        <p>No teachers added</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>#</th>
              <th>Teacher Name</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(teachers) ? teachers : [])
              .filter(Boolean)
              .map((t, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{t?.name || "Unnamed Teacher"}</td>
                  <td>{safeJoin(t?.subjects)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TeacherManagement;
