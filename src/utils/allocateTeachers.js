export function allocateTeachers(batches = [], courses = [], teachers = []) {
  let assignments = {};
  let teacherLoad = {};

  teachers.forEach(t => teacherLoad[t.name] = 0);

  function timeOverlap(aStart, aEnd, bStart, bEnd) {
    if (!aStart || !aEnd || !bStart || !bEnd) return false;
    return !(aEnd <= bStart || bEnd <= aStart);
  }

  batches.forEach(batch => {
    if (!batch) return;

    const course = courses.find(c => c.name === batch.courseName);
    if (!course) {
      assignments[batch.name] = "No course found";
      return;
    }

    const requiredSubjects = course.subjects.map(s => s.toLowerCase());

    // ✅ Subject Match Rule
    let eligible = teachers.filter(t =>
      requiredSubjects.every(sub =>
        t.subjects.map(s => s.toLowerCase()).includes(sub)
      )
    );

    // ✅ Time Conflict Rule
    eligible = eligible.filter(t => {
      const teacherBatches = Object.entries(assignments)
        .filter(([_, teacher]) => teacher === t.name)
        .map(([bname]) => batches.find(b => b.name === bname))
        .filter(Boolean);

      return !teacherBatches.some(b =>
        timeOverlap(b.startTime, b.endTime, batch.startTime, batch.endTime)
      );
    });

    // ✅ Load Balancing Rule
    eligible.sort((a, b) => teacherLoad[a.name] - teacherLoad[b.name]);

    // ✅ Fallback Rule
    if (eligible.length === 0) {
      assignments[batch.name] = "No teacher available for this batch";
    } else {
      assignments[batch.name] = eligible[0].name;
      teacherLoad[eligible[0].name]++;
    }
  });

  return assignments;
}
