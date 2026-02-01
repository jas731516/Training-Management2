import React, { useEffect, useState } from "react";

function TeacherAllocation({ batches = [], courses = [], teachers = [] }) {
  const [allocation, setAllocation] = useState({});

  const allocateTeachers = (batches, courses, teachers) => {
    const assignments = {};
    const teacherLoad = {};

  
    (teachers || []).forEach(t => {
      if (t && t.name) teacherLoad[t.name] = 0;
    });

    const timeOverlap = (aStart, aEnd, bStart, bEnd) => {
      if (!aStart || !aEnd || !bStart || !bEnd) return false;
      return !(aEnd <= bStart || bEnd <= aStart);
    };

    (batches || []).forEach(batch => {
      if (!batch || !batch.name) return;

      const course = (courses || []).find(c => c && c.name === batch.course);
      if (!course) {
        assignments[batch.name] = "No course found";
        return;
      }

      const requiredSubjects = (course.subjects || [])
        .filter(Boolean)
        .map(s => String(s).toLowerCase());

      // Subject Match Rule
      let eligible = (teachers || []).filter(t => {
        if (!t || !Array.isArray(t.subjects)) return false;
        const teacherSubjects = t.subjects
          .filter(Boolean)
          .map(s => String(s).toLowerCase());
        return requiredSubjects.every(sub => teacherSubjects.includes(sub));
      });

      // Time Conflict Rule
      eligible = eligible.filter(t => {
        const teacherBatches = Object.entries(assignments)
          .filter(([_, teacherName]) => teacherName === t.name)
          .map(([bName]) => (batches || []).find(b => b && b.name === bName))
          .filter(Boolean);

        return !teacherBatches.some(b =>
          timeOverlap(b.start, b.end, batch.start, batch.end)
        );
      });

      // Load Balancing Rule
      eligible.sort((a, b) => (teacherLoad[a.name] || 0) - (teacherLoad[b.name] || 0));

      // Assign teacher or fallback message
      if (eligible.length === 0) {
        assignments[batch.name] = "No teacher available";
      } else {
        assignments[batch.name] = eligible[0].name;
        teacherLoad[eligible[0].name] = (teacherLoad[eligible[0].name] || 0) + 1;
      }
    });

    return assignments;
  };

  // -------------------------
  // Run allocation when data changes
  // -------------------------
  useEffect(() => {
    const result = allocateTeachers(batches, courses, teachers);
    setAllocation(result);
  }, [batches, courses, teachers]);

  // -------------------------
  // Render table
  // -------------------------
  return (
    <div>
      <h2>Teacher Allocation</h2>

      {(batches || []).length === 0 ? (
        <p>No batches available.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Batch</th>
              <th>Course</th>
              <th>Time</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {(batches || []).map((b, i) => {
              const teacherName = allocation[b.name] || "-";
              return (
                <tr key={i}>
                  <td>{b.name || "-"}</td>
                  <td>{b.course || "-"}</td>
                  <td>
                    {b.start || "-"} - {b.end || "-"}
                  </td>
                  <td>{teacherName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TeacherAllocation;
