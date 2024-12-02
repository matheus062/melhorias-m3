import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const HistoryPage = ({ gameId, studentId }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/api/history/export/${studentId}/${gameId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHistory(response.data); // Exibe os dados do PDF no front-end, se aplicável
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch history.');
                setLoading(false);
            }
        };
        fetchHistory();
    }, [gameId, studentId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <h1>History</h1>
            <ul className="list-group">
                {history.map((item, index) => (
                    <li key={index} className="list-group-item">
                        <p><strong>Question:</strong> {item.text}</p>
                        <p><strong>Your Answer:</strong> {item.selectedOption}</p>
                        <p><strong>Correct Answer:</strong> {item.correctOption}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryPage;
