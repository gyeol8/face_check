import React, { useState } from 'react';
import './css/Pro.css'
import juhyeonsuImage from '../images/juhyeonsu.jpg';
import choiwoosikImage from '../images/choiwoosik.jpg';
import kimgahyunImage from '../images/kimgahyun.jpg';
import parkhannaImage from '../images/parkhanna.jpg';

function Pro() {
  const initialStudents = [
    { name: '주현수', status: ['출석', '출석', '출석', '', '', '', '', '', '', '', '', '', '', '', '', ''], image: juhyeonsuImage },
    { name: '최우식', status: ['지각', '출석', '출석', '', '', '', '', '', '', '', '', '', '', '', '', ''], image: choiwoosikImage },
    { name: '김가현', status: ['결석', '결석', '결석', '', '', '', '', '', '', '', '', '', '', '', '', ''], image: kimgahyunImage },
    { name: '박한나', status: ['결석', '결석', '결석', '', '', '', '', '', '', '', '', '', '', '', '', ''], image: parkhannaImage },
  ];

  const [students, setStudents] = useState(initialStudents);

  const weeks = ['1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차', '9주차', '10주차', '11주차', '12주차', '13주차', '14주차', '15주차', '16주차'];
  const times = ['1교시', '2교시', '3교시']; // 교시 정보

  const handleStatusChange = (studentIndex, weekIndex, timeIndex, event) => {
    const newStatus = [...students];
    newStatus[studentIndex].status[weekIndex * 3 + timeIndex] = event.target.value;
    setStudents(newStatus); // 상태 업데이트
  };

  return (
    <div className="Pro">
      <header className="Pro-header">
        <div className="course-info">
          <span>과목: 캡스톤</span>
          <span>교수이름: 우창헌</span>
          <span>시간: 금: 6~8교시</span>
        </div>
        <button className="logout-button">로그아웃</button>
      </header>
      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>학생 목록</th>
              <th>교시</th> {/* 교시 열 */}
              {weeks.map((week, index) => (
                <th key={index}>{week}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, sIndex) => (
              <React.Fragment key={sIndex}>
                <tr>
                  <td rowSpan="3">
                    <div className="student-info">
                      <img src={student.image} alt={student.name} className="student-image" />
                      <span>{student.name}</span>
                    </div>
                  </td>
                  <td>{times[0]}</td>
                  {weeks.map((_, wIndex) => (
                    <td key={wIndex}>
                      <select
                        value={student.status[wIndex * 3] || ''}
                        onChange={(e) => handleStatusChange(sIndex, wIndex, 0, e)}
                      >
                        <option value="">선택</option>
                        <option value="출석">출석</option>
                        <option value="지각">지각</option>
                        <option value="결석">결석</option>
                      </select>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>{times[1]}</td>
                  {weeks.map((_, wIndex) => (
                    <td key={wIndex}>
                      <select
                        value={student.status[wIndex * 3 + 1] || ''}
                        onChange={(e) => handleStatusChange(sIndex, wIndex, 1, e)}
                      >
                        <option value="">선택</option>
                        <option value="출석">출석</option>
                        <option value="지각">지각</option>
                        <option value="결석">결석</option>
                      </select>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>{times[2]}</td>
                  {weeks.map((_, wIndex) => (
                    <td key={wIndex}>
                      <select
                        value={student.status[wIndex * 3 + 2] || ''}
                        onChange={(e) => handleStatusChange(sIndex, wIndex, 2, e)}
                      >
                        <option value="">선택</option>
                        <option value="출석">출석</option>
                        <option value="지각">지각</option>
                        <option value="결석">결석</option>
                      </select>
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pro;
