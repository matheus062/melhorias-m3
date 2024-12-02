import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressAnimation from '../components/ProgressAnimation';
import Transition from '../components/Transition';
import {useParams} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const QuizPage = () => {
    const { gameId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [progress, setProgress] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState([]);

    const studentId = localStorage.getItem('userId');

    // Fetch inicial para verificar progresso ou iniciar o quiz
    useEffect(() => {
        const fetchQuizData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post(
                    `${API_URL}/api/progress/start`,
                    { gameId, studentId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data.completed) {
                    // Quiz já foi completado, mostra progresso
                    setCompleted(true);
                    setProgress(response.data.progress);
                    setQuestions(response.data.questions);
                    setCorrectAnswers(response.data.progress.correctAnswers || []);
                } else {
                    // Quiz ainda não foi completado, inicia
                    setQuestions(response.data.questions);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do quiz:', error);
            }
        };
        fetchQuizData();
    }, [gameId, studentId]);

    const handleSubmit = async () => {
        const isCorrect = questions[currentIndex]?.correctOption === selectedOption;

        if (isCorrect) {
            setScore((prev) => prev + 1);
            setCorrectAnswers((prev) => [...prev, questions[currentIndex].id]); // Adiciona ao array acumulado
        }

        const nextIndex = currentIndex + 1;

        if (nextIndex === questions.length) {
            try {
                const token = localStorage.getItem('token');

                // Certifique-se de usar os valores mais recentes de `score` e `correctAnswers`
                const updatedScore = isCorrect ? score + 1 : score;
                const updatedCorrectAnswers = isCorrect
                    ? [...correctAnswers, questions[currentIndex].id]
                    : correctAnswers;

                await axios.post(
                    `${API_URL}/api/progress/update`,
                    {
                        studentId,
                        gameId,
                        score: updatedScore,
                        correctAnswers: updatedCorrectAnswers,
                        phase: questions.length,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setCompleted(true);
            } catch (error) {
                console.error('Erro ao salvar progresso:', error);
            }
        } else {
            setCurrentIndex(nextIndex);
        }

        setSelectedOption(null);
    };


    // Exibe o progresso se o quiz já tiver sido concluído
    if (completed) {
        const totalQuestions = questions.length;
        const correctCount = progress?.correctAnswers?.length || 0;
        const progressPercentage = Math.round((correctCount / totalQuestions) * 100);

        return (
            <div className="container mt-5">
                <h1>Quiz Finalizado!</h1>
                <p>Sua Pontuação: {progress?.score || score} / {totalQuestions}</p>
                <p>Progresso Total: {progressPercentage}%</p>
                <p>Medalha: {progress?.medal}</p>
                <h3>Detalhes das Respostas:</h3>
                <ul className="list-group">
                    {questions.map((question, index) => (
                        <li
                            key={index}
                            className={`list-group-item ${
                                correctAnswers.includes(question.id) ? 'list-group-item-success' : 'list-group-item-danger'
                            }`}
                        >
                            <strong>{question.text}</strong>
                            <ul>
                                {question.options.map((option, i) => (
                                    <li
                                        key={i}
                                        className={
                                            i === question.correctOption
                                                ? 'text-success'
                                                : correctAnswers.includes(question.id) && i === selectedOption
                                                    ? 'text-danger'
                                                    : ''
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
        );
    }

    // Caso o quiz ainda não tenha sido concluído
    return (
        <div className="container mt-5">
            <h1>Quiz</h1>
            <Transition show={currentIndex < questions.length}>
                {questions.length > 0 && (
                    <>
                        <p>{questions[currentIndex]?.text}</p>

                        <div className="list-group">
                            {questions[currentIndex]?.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`list-group-item list-group-item-action ${
                                        selectedOption === index ? 'active' : ''
                                    }`}
                                    onClick={() => setSelectedOption(index)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary mt-3"
                            onClick={handleSubmit}
                            disabled={selectedOption === null}
                        >
                            Próxima
                        </button>
                    </>
                )}
            </Transition>

            <ProgressAnimation progress={(currentIndex / questions.length) * 100} />
        </div>
    );
};

export default QuizPage;
