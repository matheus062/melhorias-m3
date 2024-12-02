import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const DashboardStudentPage = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    // Busca os jogos disponíveis
    useEffect(() => {
        const fetchGames = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${API_URL}/api/games`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGames(response.data);
            } catch (error) {
                console.error('Erro ao buscar jogos:', error);
            }
        };
        fetchGames();
    }, []);

    // Traduz o nível de dificuldade
    const translateLevel = (level) => {
        switch (level) {
            case 'beginner':
                return 'Iniciante';
            case 'intermediate':
                return 'Intermediário';
            case 'advanced':
                return 'Avançado';
            default:
                return level;
        }
    };

    return (
        <div className="container mt-5">
            <h1>Dashboard do Aluno</h1>
            <div className="list-group mt-4">
                <h3>Jogos Disponíveis</h3>
                {games.map((game) => (
                    <div key={game.id} className="d-flex justify-content-between align-items-center">
                        <div className="flex-grow-1">
                            <strong>{game.name}</strong> - {translateLevel(game.level)}
                        </div>
                        <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => navigate(`/quiz/${game.id}`)}
                        >
                            Iniciar Jogo
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStudentPage;
