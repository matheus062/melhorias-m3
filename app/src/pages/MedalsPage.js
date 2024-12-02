import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const MedalsPage = ({ gameId, studentId }) => {
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/game-tracks/${studentId}/${gameId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProgress(response.data);
            setLoading(false);
        };
        fetchProgress();
    }, [gameId, studentId]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h1>Medals</h1>
            <div className="row">
                {progress.map((item, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Phase {item.phase}</h5>
                                <p className="card-text">
                                    Score: {item.score} - Medal: {item.medal || 'None'}
                                </p>
                                {item.medal && (
                                    <img
                                        src={`/assets/${item.medal}-medal.png`} // Assumindo que as imagens de medalhas estão em /assets
                                        alt={`${item.medal} medal`}
                                        className="img-fluid"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedalsPage;
