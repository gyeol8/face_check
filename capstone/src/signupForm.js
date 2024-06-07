// src/SignupForm.js
import React, { useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        department: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">이름:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="studentId">학번:</label>
                <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="department">학과:</label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">이메일:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">회원가입</button>
        </form>
    );
};

export default SignupForm;
