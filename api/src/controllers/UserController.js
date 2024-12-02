const User = require('../models/User'); // Importa o modelo User
const bcrypt = require('bcrypt'); // Para hash de senhas

// Listar todos os usuários
const listUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Busca todos os registros
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ message: 'Erro ao listar usuários.' });
    }
};

// Obter um único usuário por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id); // Busca o usuário pelo ID
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        res.status(500).json({ message: 'Erro ao obter usuário.' });
    }
};

// Criar um novo usuário
const createUser = async (req, res) => {
    const { email, name, password, studentCode } = req.body;

    try {
        // Validações básicas
        if (!email || !name || !password) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
        }

        // Verifica duplicidade de e-mail
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'E-mail já está em uso.' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criação do usuário
        const user = await User.create({
            email,
            name,
            password: hashedPassword,
            role: 'student',
            studentCode: studentCode,
        });

        res.status(201).json({ message: 'Estudante criado com sucesso.', user });
    } catch (error) {
        console.error('Erro ao criar estudante:', error);
        res.status(500).json({ message: 'Erro ao criar estudante.' });
    }
};

module.exports = {
    listUsers,
    getUserById,
    createUser,
};
