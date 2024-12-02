const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');

// Rotas de jogos
router.post('/', GameController.createGame);
router.get('/', GameController.getGames);

module.exports = router;
