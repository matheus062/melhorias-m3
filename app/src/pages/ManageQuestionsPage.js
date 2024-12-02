import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const ManageQuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']); // Começa com 3 respostas
    const [correctOption, setCorrectOption] = useState(null); // Índice da resposta correta
    const [level, setLevel] = useState('beginner');
    const [isAddingQuestion, setIsAddingQuestion] = useState(false); // Estado para expandir/recolher
    const [selectedQuestion, setSelectedQuestion] = useState(null); // Guarda a questão selecionada para exibir no modal

    // Busca as questões existentes
    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${API_URL}/api/questions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setQuestions(response.data);
            } catch (error) {
                console.error('Erro ao buscar questões:', error);
            }
        };
        fetchQuestions();
    }, []);

    const closeModal = () => setSelectedQuestion(null);

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

    // Adiciona uma nova questão
    const handleAddQuestion = async () => {
        if (!newQuestion.trim() || options.some((opt) => !opt.trim()) || correctOption === null) {
            alert('Preencha todos os campos antes de salvar.');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            await axios.post(
                `${API_URL}/api/questions`,
                { text: newQuestion, options, correctOption, level },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Questão adicionada com sucesso!');
            setNewQuestion('');
            setOptions(['', '', '']); // Reseta para 3 opções
            setCorrectOption(null);
            setLevel('beginner');
            setIsAddingQuestion(false); // Recolhe a seção
            // Recarrega as questões
            const response = await axios.get(`${API_URL}/api/questions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuestions(response.data);
        } catch (error) {
            console.error('Erro ao adicionar questão:', error);
            alert('Erro ao adicionar questão.');
        }
    };

    // Adiciona mais uma opção de resposta
    const handleAddOption = () => {
        setOptions((prev) => [...prev, '']);
    };

    return (
        <div className="container mt-5">
            <h1>Gerenciamento de Questões</h1>

            {/* Botão de Dropdown para adicionar nova questão */}
            <button
                className="btn btn-primary mb-3"
                onClick={() => setIsAddingQuestion(!isAddingQuestion)}
            >
                {isAddingQuestion ? 'Recolher' : 'Adicionar Nova Questão'}
            </button>

            {/* Seção de Adicionar Nova Questão */}
            {isAddingQuestion && (
                <div className="mb-4 border p-4 rounded bg-light">
                    <h3>Adicionar Nova Questão</h3>
                    <div className="mb-3">
                        <label htmlFor="questionText" className="form-label">Texto da Questão:</label>
                        <input
                            id="questionText"
                            type="text"
                            className="form-control"
                            placeholder="Digite o texto da questão"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Respostas:</label>
                        {options.map((option, index) => (
                            <div key={index} className="input-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Resposta ${index + 1}`}
                                    value={option}
                                    onChange={(e) =>
                                        setOptions((prev) =>
                                            prev.map((o, i) => (i === index ? e.target.value : o))
                                        )
                                    }
                                />
                                <div className="input-group-text">
                                    <input
                                        type="radio"
                                        name="correctOption"
                                        value={index}
                                        checked={correctOption === index}
                                        onChange={() => setCorrectOption(index)}
                                    />
                                    <span className="ms-2">Correta</span>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-secondary" onClick={handleAddOption}>
                            Adicionar Resposta
                        </button>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="levelSelect" className="form-label">Nível de Dificuldade:</label>
                        <select
                            id="levelSelect"
                            className="form-select"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            <option value="beginner">Iniciante</option>
                            <option value="intermediate">Intermediário</option>
                            <option value="advanced">Avançado</option>
                        </select>
                    </div>

                    <button className="btn btn-success" onClick={handleAddQuestion}>
                        Salvar Questão
                    </button>
                </div>
            )}

            {/* Lista de Questões Existentes */}
            <h3>Questões Existentes</h3>
            <ul className="list-group">
                {questions.map((question) => (
                    <li key={question.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{question.text.slice(0, 20)}...</strong> ({translateLevel(question.level)})
                        </div>
                        <button
                            className="btn btn-info btn-sm"
                            onClick={() => setSelectedQuestion(question)}
                        >
                            Ver Detalhes
                        </button>
                    </li>
                ))}
            </ul>

            {/* Modal para Detalhes da Questão */}
            {selectedQuestion && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalhes da Questão</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Pergunta:</strong> {selectedQuestion.text}</p>
                                <p><strong>Nível de Dificuldade:</strong> {translateLevel(selectedQuestion.level)}</p>
                                <p><strong>Respostas:</strong></p>
                                <ul>
                                    {selectedQuestion.options.map((option, index) => (
                                        <li
                                            key={index}
                                            className={index === selectedQuestion.correctOption ? 'text-success' : ''}
                                        >
                                            {index === selectedQuestion.correctOption && <strong>✔ </strong>}
                                            {option}
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

export default ManageQuestionsPage;
