import '../auth.scss';
import React, { useState, useEffect } from 'react';
// axios import removed because it's not used in this snippet

const Auth = ({ onAdminLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [contactFormData, setContactFormData] = useState(
        JSON.parse(localStorage.getItem('contactFormData') || '{}')
    );

    useEffect(() => {
        // Set up a listener for local storage changes
        const handleStorageChange = () => {
            setContactFormData(JSON.parse(localStorage.getItem('contactFormData') || '{}'));
        };

        // Listen for local storage events
        window.addEventListener('storage', handleStorageChange);

        // Clean up the listener when the component unmounts
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleAdminLogin = async (event) => {
        event.preventDefault();
        // Hardcoded admin credentials
        const adminUsername = 'trav';
        const adminPassword = 'admin'; 

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
            {contactFormData && contactFormData.name && (
                <div className="contact-form-data">
                    <h3>Contact Form Submission:</h3>
                    <p><strong>Name:</strong> {contactFormData.name}</p>
                    <p><strong>Email:</strong> {contactFormData.email}</p>
                    <p><strong>Message:</strong> {contactFormData.message}</p>
                </div>
            )}
        </div>
    );
};

export default Auth;
