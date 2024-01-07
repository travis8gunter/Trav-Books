import '../auth.scss';
import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onAdminLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleAdminLogin = async (event) => {
        event.preventDefault();
        // Hardcoded admin credentials
        const adminUsername = 'trav'; // Replace with actual admin username
        const adminPassword = 'admin'; // Replace with actual admin password

        if (username === adminUsername && password === adminPassword) {
            onAdminLogin(true); // Set the admin login state to true
            setMessage('Admin logged in successfully');
        } else {
            setMessage('Invalid admin credentials');
        }

        // Clear form fields
        setUsername('');
        setPassword('');
    };

    return (
        <div className='auth-container'>
            <div className="auth-form">
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Auth;

