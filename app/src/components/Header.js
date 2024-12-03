import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Importando o CSS

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

    return (
        <header id="header-component">
            <div className="header-container">
                <h2>Bem-vindo, {userName || 'Usuário'}</h2>
                <button className="header-button" onClick={handleGoToDashboard}>
                    Voltar ao Dashboard
                </button>
            </div>
        </header>
    );
};

export default Header;
