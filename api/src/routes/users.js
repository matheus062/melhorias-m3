const express = require('express');
const router = express.Router();
const { listUsers, getUserById, createUser } = require('../controllers/UserController');

// Rota para listar todos os usuários
router.get('/', listUsers);

// Rota para obter um usuário específico
router.get('/:id', getUserById);

// Rota para criar um novo usuário
router.post('/', createUser);

module.exports = router;