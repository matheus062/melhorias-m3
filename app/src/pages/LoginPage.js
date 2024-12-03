import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './LoginPage.css';

const API_URL = process.env.REACT_APP_API_URL;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL + '/api/auth/login', {email, password});
            const {token, id, name, role} = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', id);
            localStorage.setItem('userName', name);
            localStorage.setItem('userRole', role);

            if (role === 'teacher') {
                navigate('/dashboard');
            } else {
                navigate('/dashboard-student');
            }
        } catch (err) {
            setError('Email ou senha inválidos. Por favor, tente novamente.');
        }
    };

    return (
        <div id="login-container" className="container mt-5">
            <h1 id="login-title">Alcemar Academy</h1>
            <h2 id="login-subtitle">Login</h2>
            <form id="login-form" onSubmit={handleLogin}>
                <div id="login-email-group" className="mb-3">
                    <label htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div id="login-password-group" className="mb-3">
                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div id="login-error-message" className="text-danger">{error}</div>}
                <button id="login-submit-button" type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
