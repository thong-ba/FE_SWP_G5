import React, { useState, useEffect } from 'react';
import './Register.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [fistName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [activationCode, setActivationCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
    const [timer, setTimer] = useState(null); // Timer for countdown
    const [userId, setUserId] = useState(null); // Store user ID for verification
    const [popupMessage, setPopupMessage] = useState(''); // State for popup success/error message

    useEffect(() => {
        if (showPopup) {
            const countdown = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(countdown);
                        setErrorMessage('Time expired! You were redirected to Home.');
                        navigate('/home'); // Redirect after 30 minutes if no action
                    }
                    return prevTime - 1;
                });
            }, 1000);

            setTimer(countdown);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [showPopup, timer, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7046/api/Auth/register', {
                fistName,
                lastName,
                email,
                password,
                confirmPassword,
                role: 0, // Default role, can be changed as needed
            });

            const { isSuccess, errorMessage, result } = response.data;

            if (isSuccess) {
                toast.success('Đăng ký thành công! Bạn hãy kiểm tra lại tài khoản gmail của bạn!');
                setUserId(result); // Store userId for verification
                setShowPopup(true); // Show the popup for activation code
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setErrorMessage(errorMessage || 'Đăng ký thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('An error occurred during registration. Please try again.');
        }
    };

    const handlePopupSubmit = async () => {
        if (!activationCode) {
            setPopupMessage('Please enter the activation code.');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7046/api/Auth/Verification', {
                userId,
                verificationCode: activationCode,
            });

            const { isSuccess, message } = response.data;

            if (isSuccess) {
                setPopupMessage('Mã kích hoạt thành công! Bạn sẽ được chuyển về trang chủ sau 3 giây.');
                // Redirect after 3 seconds
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                setPopupMessage(message || 'Mã xác nhận không hợp lệ. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setPopupMessage('An error occurred during verification. Please try again.');
        }
    };

    const formatTimeLeft = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
                    Already have an account? <a href="/login" className="login-link-text">Login here</a>
                </p>
            </div>

            {/* Popup for activation code */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Account Created!</h3>
                        <p>Please check your email for an activation code. You have {formatTimeLeft(timeLeft)} left to enter the code.</p>
                        <input
                            type="text"
                            placeholder="Enter Activation Code"
                            value={activationCode}
                            onChange={(e) => setActivationCode(e.target.value)}
                        />
                        <button onClick={handlePopupSubmit}>Submit</button>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                        {popupMessage && <p className="error-message">{popupMessage}</p>}
                    </div>
                </div>
            )}
        </>
    );
}

export default Register;

