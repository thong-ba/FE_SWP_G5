import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

function Register() {
    const [fistName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form

        const data = {
            fistName,
            lastName,
            email,
            password,
            confirmPassword,
            role: 0
        };

        try {
            const response = await axios.post('https://localhost:7046/api/Auth/register', data);
            if (response.data.isSuccess) {
                alert('Đăng ký thành công bạn hãy kiểm tra lại tại khoản gmail của bạn nha!');
            } else {
                // Hiển thị thông báo lỗi chi tiết
                setErrorMessage(response.data.errorMessage || 'Đăng ký không thành công.');
            }
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi
            if (error.response) {
                // Nếu có phản hồi từ server
                console.error('Error response:', error.response.data);
                setErrorMessage(error.response.data.errorMessage || 'Có lỗi xảy ra. Vui lòng thử lại.');
            } else {
                // Nếu không có phản hồi từ server
                console.error('Error message:', error.message);
                setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="register-container">
            <h2 className='tittle' >Register Page</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={fistName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
}

export default Register;