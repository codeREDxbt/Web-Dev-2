import { useState } from "react";

function StudentRow({ student, onUpdateScore }) {
  const [tempScore, setTempScore] = useState(student.score);
  const isPass = student.score >= 40;

  const handleApply = () => {
    onUpdateScore(student.id, tempScore);
  };

  return (
    <tr className={isPass ? "pass" : "fail"}>
      <td>
        <span className="student-name">{student.name}</span>
      </td>

      <td>
        <span className="score-display">{student.score}</span>
      </td>

      <td>
        <span className={`badge ${isPass ? "badge-pass" : "badge-fail"}`}>
          {isPass ? "PASS" : "FAIL"}
        </span>
      </td>

      <td>
        <div className="update-cell">
          <input
            type="number"
            value={tempScore}
            onChange={(e) => setTempScore(e.target.value)}
            min="0"
            max="100"
          />
          <button type="button" onClick={handleApply}>
            UPDATE
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentRow;