import StudentRow from "./StudentRow.jsx";

function StudentTable({ students, onUpdateScore }) {
  return (
    <div className="table-wrapper">
      <div className="table-header-bar">
        <div className="table-header-label">Student Records</div>
        <div className="table-header-count">
          {students.length.toString().padStart(2, "0")} ENTRIES
        </div>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">–</div>
          <div className="empty-state-text">NO STUDENTS YET</div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Score</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <StudentRow
                key={s.id}
                student={s}
                onUpdateScore={onUpdateScore}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentTable;