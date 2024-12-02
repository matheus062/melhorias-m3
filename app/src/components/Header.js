import React from 'react';
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName'); // Supondo que o nome do usuário está salvo no localStorage

    const handleGoToDashboard = () => {
        const role = localStorage.getItem('userRole'); // Supondo que o nome do usuário está salvo no localStorage

        if (role === 'teacher') {
            navigate('/dashboard'); // Navega para o Dashboard
        } else {
            navigate('/dashboard-student'); // Navega para o Dashboard
        }
    };

    return (
        <header className="bg-light py-3 mb-4">
            <div className="container d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Bem-vindo, {userName || 'Usuário'}</h2>
                <button className="btn btn-secondary" onClick={handleGoToDashboard}>
                    Voltar ao Dashboard
                </button>
            </div>
        </header>
    );
};

export default Header;
