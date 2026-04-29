import { useState } from "react";
import Header from "./Components/Header.jsx";
import AddStudentForm from "./Components/AddStudentForm.jsx";
import StudentTable from "./Components/StudentTable.jsx";

const initialStudents = [
  { id: 1, name: "Vinayak Vashisth", score: 85 },
  { id: 2, name: "Pulkit Pradhan", score: 92 },
  { id: 3, name: "Trigya Yogi", score: 78 },
  { id: 4, name: "Ayush Nayak", score: 88 },
];

function App() {
  const [students, setStudents] = useState(initialStudents);

  const handleAddStudent = (name, score) => {
    const trimName = name.trim();
    if (!trimName) return;
    const numericScore = Number(score);
    if (Number.isNaN(numericScore)) return;

    const newStudent = {
      id: Date.now(),
      name: trimName,
      score: numericScore,
    };

    setStudents((prev) => [...prev, newStudent]);
  };

  const handleUpdateScore = (id, newScore) => {
    const numericScore = Number(newScore);
    if (Number.isNaN(numericScore)) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: numericScore } : s))
    );
  };

  const totalStudents = students.length;
  const passCount = students.filter((s) => s.score >= 40).length;
  const avgScore =
    totalStudents === 0
      ? 0
      : Math.round(
          students.reduce((sum, s) => sum + s.score, 0) / totalStudents
        );

  return (
    <div className="container">
      <Header />

      {}
      <div className="stats-strip">
        <div className="stat-cell">
          <div className="stat-label">Total Students</div>
          <div className="stat-value">{totalStudents}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Passed</div>
          <div className="stat-value">{passCount}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Average Score</div>
          <div className="stat-value">{avgScore}</div>
        </div>
      </div>

      {}
      <AddStudentForm onAddStudent={handleAddStudent} />

      {}
      <StudentTable students={students} onUpdateScore={handleUpdateScore} />

      <footer className="footer">
        STUDENT SCOREBOARD • REACT • KRMU LAB
      </footer>
    </div>
  );
}

export default App;