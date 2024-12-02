import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const RankingPage = ({ gameId }) => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/performance/game/${gameId}/ranking`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRanking(response.data);
            setLoading(false);
        };

        fetchRanking();
    }, [gameId]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h1>Game Ranking</h1>
            <div className="list-group">
                {ranking.map((entry, index) => (
                    <div key={entry.student.id} className="list-group-item">
                        <strong>{index + 1}. {entry.student.email}</strong> - {entry.score} points
                        {entry.medal && (
                            <img
                                src={`/assets/${entry.medal}-medal.png`}
                                alt={`${entry.medal} medal`}
                                className="img-fluid"
                                style={{ width: '30px', marginLeft: '10px' }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RankingPage;
