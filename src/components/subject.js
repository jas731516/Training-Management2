import React, { useState, useEffect, useMemo } from "react";
import { allocateTeachers } from "../utils/allocateTeachers";

function SubjectManagement({
  subjects = [],
  setSubjects,
  batches = [],
  courses = [],
  teachers = []
}) {
  const [subjectName, setSubjectName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // ✅ Memoized teacher allocation
  const teacherAllocation = useMemo(
    () => allocateTeachers(batches || [], courses || [], teachers || []),
    [batches, courses, teachers]
  );

  // ✅ Duplicate subject check
  useEffect(() => {
    if (!subjectName.trim()) {
      setMessage("");
      setIsError(false);
      return;
    }

    const duplicate = (subjects || []).some(
      (s) => s?.toLowerCase() === subjectName.trim().toLowerCase()
    );

    if (duplicate) {
      setMessage("Subject already exists ❌");
      setIsError(true);
    } else {
      setMessage("");
      setIsError(false);
    }
  }, [subjectName, subjects]);

  // ✅ Add Subject
  const handleAdd = () => {
    const name = subjectName.trim();
    if (!name || isError) return;

    setSubjects([...subjects, name]);
    setSubjectName("");
    setMessage("Subject added successfully ✅");
    setIsError(false);
  };
  const handleDelete = (index) => {
    const subjectToDelete = subjects[index]?.toLowerCase();

    const usedInTeacher = (teachers || []).some((t) =>
      (t?.subjects || []).some((s) => s?.toLowerCase() === subjectToDelete)
    );

    if (usedInTeacher) {
      setMessage(`❌ Cannot delete "${subjects[index]}". Used in Teacher.`);
      setIsError(true);
      return;
    }

    // 2️⃣ Check Course Usage
    const usedInCourse = (courses || []).some((c) =>
      (c?.subjects || []).some((s) => s?.toLowerCase() === subjectToDelete)
    );

    if (usedInCourse) {
      setMessage(`❌ Cannot delete "${subjects[index]}". Used in Course.`);
      setIsError(true);
      return;
    }

    // 3️⃣ Check Batch Allocation
    const isAllocated = Object.keys(teacherAllocation || {}).some((batchName) => {
      const batch = (batches || []).find((b) => b?.name === batchName);
      if (!batch) return false;

      const course = (courses || []).find((c) => c?.name === batch.course);
      if (!course) return false;

      return (course.subjects || []).some(
        (s) => s?.toLowerCase() === subjectToDelete
      );
    });

    if (isAllocated) {
      setMessage(`❌ Cannot delete "${subjects[index]}". Allocated in Batch.`);
      setIsError(true);
      return;
    }

    // ✅ SAFE DELETE
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
    setMessage(`"${subjects[index]}" deleted successfully ✅`);
    setIsError(false);
  };

  return (
    <div className="module-card">
      <h3>📚 Subject Management</h3>

      <div className="form-row">
        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <button onClick={handleAdd} disabled={!subjectName.trim() || isError}>
          Add
        </button>
      </div>

      {message && <p className={isError ? "error" : "success"}>{message}</p>}

      {subjects.length === 0 ? (
        <p className="empty">No subjects added yet</p>
      ) : (
        <ul className="list">
          {subjects.map((sub, index) => (
            <li key={`${sub}-${index}`}>
              {sub}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubjectManagement;
