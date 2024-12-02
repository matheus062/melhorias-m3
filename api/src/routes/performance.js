const express = require('express');
const router = express.Router();
const PerformanceController = require('../controllers/PerformanceController');

// Rotas de desempenho
router.post('/', PerformanceController.recordPerformance);
router.get('/student/:studentId', PerformanceController.getPerformanceByStudent);
router.get('/game/:gameId/ranking', PerformanceController.getRankingByGame);

module.exports = router;
