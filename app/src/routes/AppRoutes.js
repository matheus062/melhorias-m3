import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import QuizPage from '../pages/QuizPage';
import HistoryPage from '../pages/HistoryPage';
import ReportsPage from '../pages/ReportsPage';
import CreateGamePage from '../pages/CreateGamePage';
import ManageQuestionsPage from '../pages/ManageQuestionsPage';
import MedalsPage from '../pages/MedalsPage';
import RegisterStudent from '../pages/RegisterStudent';
import Header from '../components/Header';
import DashboardStudentPage from "../pages/DashboardStudentPage";

const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard-student" element={<DashboardStudentPage />} />
                <Route path="/create-game" element={<CreateGamePage />} />
                <Route path="/manage-questions" element={<ManageQuestionsPage />} />
                <Route path="/register-students" element={<RegisterStudent />} />
                <Route path="/quiz/:gameId" element={<QuizPage />} />




                <Route path="/history/:studentId/:gameId" element={<HistoryPage />} />
                <Route path="/reports/:gameId" element={<ReportsPage />} />
                <Route path="/medals/:gameId/:studentId" element={<MedalsPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
