const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/HistoryController');

// Rota para exportar histórico
router.get('/export/:studentId/:gameId', HistoryController.exportHistory);

module.exports = router;
