
import { useState, useEffect } from "react";
function BatchManagement({ courses = [], batches = [], setBatches }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const addBatch = () => {
    if (!name && !course && !start && !end) return;

    const trimmedName = name.trim();

    if (!trimmedName || !course || !start || !end) {
      setMsg("All fields required");
      return;
    }
    if (start >= end) {
      setMsg("Start time must be before end time");
      return;
    }
    const isDuplicate = batches.some(
      (b) =>
        b.name.toLowerCase() === trimmedName.toLowerCase() &&
        b.course === course &&
        b.start === start &&
        b.end === end
    );

    if (isDuplicate) {
      setMsg("Batch already exists");
      return;
    }

    setBatches([...batches, { name: trimmedName, course, start, end }]);
    setName("");
    setCourse("");
    setStart("");
    setEnd("");
    setMsg("Batch added");
  };

  return (
    <div className="batch-container">
      <h3>Batch Management</h3>

      <input
        className="input"
        placeholder="Batch Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="input"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses.map((c, i) => (
          <option key={i}>{c.name}</option>
        ))}
      </select>

      <div className="time-row">
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      <button
        type="button" 
        className="btn"
        onClick={addBatch}
        disabled={!name.trim() || !course || !start || !end} 
      >
        Add Batch
      </button>

      {msg && <p className="msg">{msg}</p>}

      <ul className="batch-list">
        {batches.map((b, i) => (
          <li key={i}>
            {b.name} | {b.course} | {b.start} - {b.end}
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
}

export default BatchManagement;
