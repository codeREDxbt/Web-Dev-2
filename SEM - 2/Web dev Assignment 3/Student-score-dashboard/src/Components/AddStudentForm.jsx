import { useState } from "react";

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(name, score);
    setName("");
    setScore("");
  };

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <div className="form-header-dot" />
        <div className="form-header-label">Register Student</div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="STUDENT NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="SCORE (0 - 100)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          min="0"
          max="100"
          required
        />

        <button type="submit">
          <span>ADD ENTRY</span>
        </button>
      </form>
    </div>
  );
}

export default AddStudentForm;