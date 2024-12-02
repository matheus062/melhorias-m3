import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const DashboardPage = () => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null); // Guarda o jogo selecionado para o modal
    const [detailedQuestions, setDetailedQuestions] = useState([]); // Perguntas detalhadas do jogo
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGames = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${API_URL}/api/games`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setGames(response.data);
            } catch (error) {
                console.error('Erro ao buscar jogos:', error);
            }
        };
        fetchGames();
    }, []);

// Busca as perguntas detalhadas quando um jogo é selecionado
    const fetchDetailedQuestions = async (questionIds) => {
        const token = localStorage.getItem('token');

        try {
            // Faz o fetch para cada ID e aguarda todos os resultados
            const promises = questionIds.map(async (id) => {
                const response = await axios.get(`${API_URL}/api/questions/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                return response.data;
            });

            // Resolve todas as promessas e atualiza o estado com as perguntas detalhadas
            const results = await Promise.all(promises);

            console.log(results)

            setDetailedQuestions(results); // Atualiza o estado com os detalhes das perguntas
        } catch (error) {
            console.error('Erro ao buscar perguntas detalhadas:', error);
        }
    };
    const closeModal = () => setSelectedGame(null);

    // Quando um jogo é selecionado
    const handleSelectGame = (game) => {
        setSelectedGame(game);
        fetchDetailedQuestions(game.questions); // Busca detalhes das perguntas
    };


    const handleCreateGame = () => {
        navigate('/create-game'); // Navega para a página de criação de jogo
    };

    const handleManageQuestions = () => {
        navigate('/manage-questions'); // Navega para a página de gerenciamento de perguntas
    };

    const handlePerformance = () => {
        navigate('/performance'); // Navega para a página de desempenho dos alunos
    };

    const handleRegisterStudents = () => {
        navigate('/register-students'); // Navega para a página de cadastro de alunos
    };

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

    // todo: fazer dashboard dos alunos

    return (
        <div className="container mt-5">
            <h1>Dashboard do Professor</h1>
            <button className="btn btn-primary mb-3" onClick={handlePerformance}>
                Desempenho dos Alunos
            </button>
            <button className="btn btn-info mb-3" onClick={handleManageQuestions}>
                Cadastro de Perguntas e Respostas
            </button>
            <button className="btn btn-success mb-3" onClick={handleCreateGame}>
                Cadastro de Jogos
            </button>
            <button className="btn btn-warning mb-3" onClick={handleRegisterStudents}>
                Cadastro de Alunos
            </button>
            <div className="list-group mt-4">
                <h3>Jogos Disponíveis</h3>
                {games.map((game) => (
                    <div key={game.id} className="d-flex justify-content-between align-items-center">
                        <a
                            href={`/quiz/${game.id}`}
                            className="list-group-item list-group-item-action flex-grow-1 me-3"
                        >
                            {game.name} - {translateLevel(game.level)}
                        </a>
                        <button
                            className="btn btn-info btn-sm"
                            onClick={() => handleSelectGame(game)}
                        >
                            Ver Detalhes
                        </button>
                    </div>
                ))}
            </div>
            {selectedGame && (
                <div className="modal d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalhes do Jogo</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Nome do Jogo:</strong> {selectedGame.name}</p>
                                <p><strong>Nível de Dificuldade:</strong> {translateLevel(selectedGame.level)}</p>
                                <p><strong>Perguntas:</strong></p>
                                <ul>
                                    {detailedQuestions.map((question, index) => (
                                        <li key={index}>
                                            <strong>Pergunta:</strong> {question.text}
                                            <ul>
                                                {question.options.map((option, i) => (
                                                    <li
                                                        key={i}
                                                        className={
                                                            i === question.correctOption ? 'text-success' : ''
                                                        }
                                                    >
                                                        {i === question.correctOption && <strong>✔ </strong>}
                                                        {option}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
