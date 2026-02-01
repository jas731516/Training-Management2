// import { useState, useEffect } from "react";

// function CourseManagement({ subjects = [], courses = [], setCourses }) {
//   const [name, setName] = useState("");
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [msg, setMsg] = useState("");

//   const toggleSubject = (sub) => {
//     setSelectedSubjects((prev) =>
//       prev.includes(sub)
//         ? prev.filter((s) => s !== sub)
//         : [...prev, sub]
//     );
//   };

//   // ✅ Auto clear message
//   useEffect(() => {
//     if (msg) {
//       const timer = setTimeout(() => setMsg(""), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [msg]);

//   const addCourse = () => {
//     // Guard after reset
//     if (!name && selectedSubjects.length === 0) return;

//     const trimmedName = name.trim();

//     if (!trimmedName) {
//       setMsg("Course name is required");
//       return;
//     }

//     // ✅ REQUIRED: alert when less than 2 subjects selected
//     if (selectedSubjects.length < 2) {
//       alert("Please select at least 2 subjects");   // 🔥 ALERT
//       setMsg("Select at least 2 subjects");
//       return;
//     }

//     const isDuplicate = courses.some(
//       (c) => c.name.toLowerCase() === trimmedName.toLowerCase()
//     );

//     if (isDuplicate) {
//       setMsg("Course already exists");
//       return;
//     }

//     setCourses([...courses, { name: trimmedName, subjects: selectedSubjects }]);
//     setName("");
//     setSelectedSubjects([]);
//     setMsg("Course created");
//   };

//   return (
//     <div className="course-container">
//       <h3>Course Management</h3>

//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Course Name"
//       />

//       <div className="subjects">
//         {subjects.map((s, i) => (
//           <label key={i}>
//             <input
//               type="checkbox"
//               checked={selectedSubjects.includes(s)}
//               onChange={() => toggleSubject(s)}
//             />
//             {s}
//           </label>
//         ))}
//       </div>

//       <button
//         type="button"
//         onClick={addCourse}
//         disabled={!name.trim()}
//       >
//         Add Course
//       </button>

//       {msg && <p className="message">{msg}</p>}

//       <ul>
//         {courses.map((c, i) => (
//           <li key={i}>
//             {c.name} → {c.subjects.join(", ")}
//           </li>
//         ))}
//       </ul>

//       <hr />
//     </div>
//   );
// }

// export default CourseManagement;
import { useState, useEffect } from "react";

function CourseManagement({ subjects = [], courses = [], setCourses }) {
  const [name, setName] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [msg, setMsg] = useState("");

  const toggleSubject = (sub) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub)
        ? prev.filter((s) => s !== sub)
        : [...prev, sub]
    );
  };

  // Auto-clear message
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const addCourse = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setMsg("Course name is required");
      return;
    }

    if (selectedSubjects.length < 2) {
      setMsg("Select at least 2 subjects");
      return;
    }

    const isDuplicate = courses.some(
      (c) => c?.name?.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      setMsg("Course already exists");
      return;
    }

    setCourses([
      ...(Array.isArray(courses) ? courses : []),
      { name: trimmedName, subjects: Array.isArray(selectedSubjects) ? selectedSubjects : [] }
    ]);

    setName("");
    setSelectedSubjects([]);
    setMsg("Course created");
  };

  return (
    <div className="course-container">
      <h3>Course Management</h3>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Course Name"
      />

      <div className="subjects">
        {Array.isArray(subjects) && subjects.length > 0 ? (
          subjects.map((s, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={selectedSubjects.includes(s)}
                onChange={() => toggleSubject(s)}
              />
              {s}
            </label>
          ))
        ) : (
          <p>No subjects available</p>
        )}
      </div>

      <button
        type="button"
        onClick={addCourse}
        disabled={!name.trim()}
      >
        Add Course
      </button>

      {msg && <p className="message">{msg}</p>}

      <ul>
        {(Array.isArray(courses) ? courses : [])
          .filter(Boolean)
          .map((c, i) => {
            const courseName = c?.name || "Unnamed Course";
            const courseSubjects = Array.isArray(c?.subjects) ? c.subjects : [];
            return (
              <li key={i}>
                {courseName} → {courseSubjects.join(", ")}
              </li>
            );
          })}
      </ul>

      <hr />
    </div>
  );
}

export default CourseManagement;
