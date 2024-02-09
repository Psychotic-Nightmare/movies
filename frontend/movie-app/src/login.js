import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css';

function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const login = () => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameOrEmail, // send the username or email
                password
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/welcome'); // Navigate to the welcome page
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="signup-container">
            <input className="signup-input" value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} placeholder="Username or Email" />
            <input className="signup-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button className="signup-button" onClick={login}>Log In</button>
        </div>
    );
}

export default Login;