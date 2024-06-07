import React from 'react';

const AttendanceChart = ({ professor, subject, department, attendanceData }) => {
  // 1주차부터 16주차까지의 라벨 생성
  const weeks = Array.from({ length: 16 }, (_, i) => `Week ${i + 1}`);

  return (
    <div className="attendance-chart">
      <h2>Attendance Chart</h2>
      <div className="course-info">
        <p><strong>Professor:</strong> {professor}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Department:</strong> {department}</p>
      </div>
      <div className="attendance-data">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              {weeks.map((week, index) => (
                <th key={index}>{week}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student, studentIndex) => (
              <tr key={studentIndex}>
                <td>{student.name}</td>
                {student.attendance.map((status, weekIndex) => (
                  <td key={weekIndex}>{status ? '출석' : '결석'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceChart;
