import React, { useState } from 'react';

const initialData = [
    { name: '주현수', attendance: ['출석', '출석', '결석', '출석', '출석', '출석', '결석', '출석', '출석', '출석', '출석', '결석', '출석', '출석', '출석', '결석'] },
    { name: '최우식', attendance: ['출석', '출석', '출석', '출석', '출석', '결석', '출석', '출석', '출석', '출석', '출석', '출석', '결석', '출석', '출석', '출석'] },
    { name: '김가현', attendance: ['출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석'] },
    { name: '박한나', attendance: ['출석', '출석', '출석', '출석', '결석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석', '출석'] }
];

const AttendanceTable = () => {
    const [data, setData] = useState(initialData);

    const handleAttendanceChange = (studentIndex, weekIndex, value) => {
        const newData = [...data];
        newData[studentIndex].attendance[weekIndex] = value;
        setData(newData);
    };

    return (
        <div>
            <h1>출결 관리 시스템</h1>
            <table>
                <thead>
                    <tr>
                        <th>학생 이름</th>
                        {Array.from({ length: 16 }, (_, i) => (
                            <th key={i}>{i + 1}주차</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((student, studentIndex) => (
                        <tr key={studentIndex}>
                            <td>{student.name}</td>
                            {student.attendance.map((status, weekIndex) => (
                                <td key={weekIndex}>
                                    <select
                                        value={status}
                                        onChange={(e) => handleAttendanceChange(studentIndex, weekIndex, e.target.value)}
                                    >
                                        <option value="출석">출석</option>
                                        <option value="결석">결석</option>
                                    </select>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
