const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const ProgressController = require('../controllers/ProgressController');

// Rota para verificar ou iniciar o progresso de um aluno
router.post('/start', authenticate, ProgressController.startQuizOrGetProgress);

// Rota para atualizar o progresso de um aluno
router.post('/update', authenticate, ProgressController.updateProgress);

// Rota para buscar todos os progressos de um aluno
router.get('/student/:studentId', authenticate, ProgressController.getProgressByStudent);

// Rota para buscar o progresso de um aluno em um jogo específico
router.get('/student/:studentId/game/:gameId', authenticate, ProgressController.getProgressByGame);

module.exports = router;
