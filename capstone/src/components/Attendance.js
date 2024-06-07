import React from 'react';

const Attendance = ({ subject, professor, students }) => {
  return (
    <div className="attendance-container">
      <h2>과목: {subject}</h2>
      <h3>교수: {professor}</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>학생 이름</th>
              {Array.from({ length: 16 }, (_, i) => (
                <th key={i + 1}>{i + 1}주차</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                {student.attendance.map((status, i) => (
                  <td key={i} className={status === '결석' ? 'absent' : 'present'}>
                    {status}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .attendance-container {
          padding: 20px;
        }
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
        }
        .absent {
          background-color: #ffcccc;
        }
        .present {
          background-color: #ccffcc;
        }
      `}</style>
    </div>
  );
};

export default Attendance;
