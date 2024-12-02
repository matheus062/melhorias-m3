import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const ReportsPage = ({ gameId }) => {
    const [reportUrl, setReportUrl] = useState('');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/api/reports/performance/game/${gameId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'blob', // Para baixar o PDF
                });

                // Cria URL para download do PDF
                const url = window.URL.createObjectURL(new Blob([response.data]));
                setReportUrl(url);
            } catch (err) {
                console.error('Failed to fetch report:', err);
            }
        };
        fetchReport();
    }, [gameId]);

    return (
        <div className="container mt-5">
            <h1>Performance Report</h1>
            {reportUrl ? (
                <a href={reportUrl} download="performance_report.pdf" className="btn btn-primary">
                    Download Report
                </a>
            ) : (
                <p>Generating report...</p>
            )}
        </div>
    );
};

export default ReportsPage;
