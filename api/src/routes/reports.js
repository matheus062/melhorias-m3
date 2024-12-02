const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');

// Rotas de relatórios
router.get('/performance/game/:gameId', ReportController.exportPerformanceReport);

module.exports = router;
