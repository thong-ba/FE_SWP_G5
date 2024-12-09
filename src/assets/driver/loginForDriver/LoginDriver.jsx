import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function LoginDriver({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleDriverLogin = async (e) => {
        e.preventDefault();

        try { 
            const response = await axios.post('https://localhost:7046/api/Auth/loginDriver', {
                userEmail: email,
                password: password
            });

            if (response.data.isSuccess) {
                const token = response.data.result;
                const decoded = jwtDecode(token);
                console.log("Decode: ", decoded);
                const driverId = decoded.DriverId;
                console.log("Driver Id:", driverId);
                localStorage.setItem('token', token);
                localStorage.setItem('driverId', driverId);

                setMessage('Login successful!');
                setIsLoggedIn(true);
                setTimeout(() => navigate('/driver'), 1000);
            }
            else {
                setMessage('Login failed: ' + (response.data.errorMessage || 'Unknown error'));
            }
        }
        catch (error) {
            console.error(error);
            setMessage('Error: Unable to connect to server.');
        }
    };

    return (  
        <div className="login-driver-container">  
          <h2>Login For Driver</h2>  
          <form onSubmit={handleDriverLogin}>  
            <input  
              type="text"  
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
            <button type="submit">Login</button>  
          </form>  
          {message && <div className="message-box">{message}</div>}  
        </div>  
      );  
}

export default LoginDriver;