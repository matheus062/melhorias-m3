import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

const CreateGamePage = () => {
    const [gameName, setGameName] = useState('');
    const [level, setLevel] = useState('beginner');
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isRandom, setIsRandom] = useState(true); // Define se o modo será aleatório
    const navigate = useNavigate();

    // Busca todas as perguntas ao montar o componente
    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${API_URL}/api/questions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setQuestions(response.data);
            } catch (error) {
                console.error('Erro ao buscar perguntas:', error);
            }
        };
        fetchQuestions();
    }, []);

    // Cria o jogo
    const handleCreateGame = async () => {
        if (!gameName.trim()) {
            alert('Por favor, insira um nome para o jogo.');
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const questionIds = isRandom
                ? questions
                    .filter((q) => q.level === level)
                    .map((q) => q.id)
                    .sort(() => 0.5 - Math.random()) // Embaralha as perguntas
                    .slice(0, 10) // Seleciona as primeiras 10 perguntas
                : selectedQuestions;

            if (questionIds.length === 0) {
                alert('Nenhuma pergunta selecionada ou disponível para o nível escolhido.');
                return;
            }

            await axios.post(
                `${API_URL}/api/games`,
                { name: gameName, level, questions: questionIds },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Jogo criado com sucesso!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao criar o jogo:', error);
            alert('Erro ao criar o jogo.');
        }
    };

    // Alterna entre os modos aleatório e manual
    const handleModeChange = (e) => {
        setIsRandom(e.target.value === 'random');
        if (e.target.value === 'random') setSelectedQuestions([]); // Limpa seleção no modo aleatório
    };

    return (
        <div className="container mt-5">
            <h1>Criar Novo Jogo</h1>

            {/* Nome do Jogo */}
            <div className="mb-3">
                <label htmlFor="gameName" className="form-label">Nome do Jogo</label>
                <input
                    type="text"
                    className="form-control"
                    id="gameName"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                />
            </div>

            {/* Nível de Dificuldade */}
            <div className="mb-3">
                <label htmlFor="level" className="form-label">Nível de Dificuldade</label>
                <select
                    id="level"
                    className="form-select"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                >
                    <option value="beginner">Iniciante</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="advanced">Avançado</option>
                </select>
            </div>

            {/* Modo de Seleção */}
            <div className="mb-3">
                <label className="form-label">Modo de Seleção de Perguntas</label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="selectionMode"
                        value="random"
                        checked={isRandom}
                        onChange={handleModeChange}
                    />
                    <label className="form-check-label">Seleção Aleatória</label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="selectionMode"
                        value="manual"
                        checked={!isRandom}
                        onChange={handleModeChange}
                    />
                    <label className="form-check-label">Seleção Manual</label>
                </div>
            </div>

            {/* Seleção Manual de Perguntas */}
            {!isRandom && (
                <div className="mb-3">
                    <h4>Selecione as Perguntas</h4>
                    {questions
                        .filter((q) => q.level === level)
                        .map((question) => (
                            <div key={question.id} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={question.id}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedQuestions([...selectedQuestions, question.id]);
                                        } else {
                                            setSelectedQuestions(
                                                selectedQuestions.filter((id) => id !== question.id)
                                            );
                                        }
                                    }}
                                />
                                <label className="form-check-label">{question.text}</label>
                            </div>
                        ))}
                </div>
            )}

            {/* Botão para Criar o Jogo */}
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateGame}
            >
                Criar Jogo
            </button>
        </div>
    );
};

export default CreateGamePage;
