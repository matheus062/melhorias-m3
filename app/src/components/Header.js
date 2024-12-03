import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');

    const handleGoToDashboard = () => {
        const role = localStorage.getItem('userRole');

        if (role === 'teacher') {
            navigate('/dashboard');
        } else {
            navigate('/dashboard-student');
        }
    };

    const handleLogoff = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <header id="header-component">
            <div className="header-container">
                <h2 id="header-user-greeting">Bem-vindo, {userName || 'Usuário'}</h2>
                <div className="header-buttons">
                    <button className="header-button" onClick={handleGoToDashboard}>
                        Voltar ao Dashboard
                    </button>
                    <button className="header-logoff-button" onClick={handleLogoff}>
                        Logoff
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
