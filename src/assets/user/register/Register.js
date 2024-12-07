import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { registerUser } from '../../../api/AuthApi'; // Adjust the import path as necessary
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // 

function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(''); // Corrected variable name
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form action

        const { isSuccess, errorMessage, result } = await registerUser(firstName, lastName, email, password, confirmPassword);

        if (isSuccess) {
            toast.success('Đăng ký thành công! Bạn hãy kiểm tra lại tài khoản gmail của bạn!');

            // Delay navigation to allow the toast to display
            setTimeout(() => {
                navigate(`/verify/${result}`); // Navigate to verification page
            }, 2000); // Adjust the timeout as necessary (2000ms = 2 seconds)

            // Optionally clear the form fields after successful registration
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } else {
            // Display detailed error message
            setErrorMessage(errorMessage);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="register-container">
                <h2 className='title'>Register User</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
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
                    <button type="submit">Register</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
        </>
    );
}

export default Register;