import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signup = () => {
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Username or email already exists');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            navigate('/login');
        })
        .catch((error) => {
            console.error('Error:', error);
            setError(error.message);
        });
    };

    return (
        <div className="signup-container">
            <input className="signup-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input className="signup-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
            <input className="signup-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <button className="signup-button" onClick={signup}>Sign Up</button>
            <p>Already have an account? <Link to="/login" style={{ color: 'blue' }}>Log in</Link></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Signup;