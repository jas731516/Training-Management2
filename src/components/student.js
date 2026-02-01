
import { useState, useEffect } from "react";

function StudentManagement({ courses, batches, students, setStudents }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [msg, setMsg] = useState("");

  const filteredBatches = batches.filter((b) => b.course === course);

  useEffect(() => {
    setBatch("");
  }, [course]);

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const addStudent = () => {
    const trimmedName = name.trim();

    if (!trimmedName || !course || !batch) {
      setMsg("All fields are mandatory");
      return;
    }
    const isDuplicate = students.some(
      (s) =>
        s.name.toLowerCase() === trimmedName.toLowerCase() &&
        s.course === course &&
        s.batch === batch
    );

    if (isDuplicate) {
      setMsg("Student already exists");
      return;
    }

    setStudents([...students, { name: trimmedName, course, batch }]);
    setName("");
    setCourse("");
    setBatch("");
    setMsg("Student added");
  };

  return (
    <div className="student-container">
      <h3>Student Management</h3>

      <input
        className="input-field"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="input-field"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses.map((c, i) => (
          <option key={i}>{c.name}</option>
        ))}
      </select>

      <select
        className="input-field"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
        disabled={!course}  
      >
        <option value="">Select Batch</option>
        {filteredBatches.map((b, i) => (
          <option key={i}>{b.name}</option>
        ))}
      </select>

      <button
        className="add-btn"
        onClick={addStudent}
        disabled={!name || !course || !batch} 
      >
        Add Student
      </button>

      {msg && <p className="message">{msg}</p>}

      <ul className="student-list">
        {students.map((s, i) => (
          <li key={i}>
            {s.name} | {s.course} | {s.batch}
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
}

export default StudentManagement;

