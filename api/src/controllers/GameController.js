const Game = require('../models/Game');
const Question = require('../models/Question');

exports.createGame = async (req, res) => {
    const { name, level, questions } = req.body;

    try {
        // Valida se o array questionIds está correto
        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ error: 'O campo questions deve ser um array de IDs válidos.' });
        }

        // Valida se todos os IDs no array são definidos
        if (questions.some((id) => id === undefined || id === null)) {
            return res.status(400).json({ error: 'Algum ID no array questions é inválido.' });
        }

        // Busca as perguntas no banco de dados
        const questionsSearch = await Question.findAll({ where: { id: questions } });

        // Valida se todas as perguntas foram encontradas
        if (questionsSearch.length !== questions.length) {
            return res.status(400).json({ error: 'Algumas perguntas não foram encontradas no banco de dados.' });
        }

        // Cria o jogo no banco de dados
        const game = await Game.create({ name, level, questions });
        res.status(201).json({ message: 'Jogo criado com sucesso.', game });
    } catch (error) {
        console.error('Erro ao criar o jogo:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getGames = async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        console.error('Erro ao buscar jogos:', error);
        res.status(500).json({ error: error.message });
    }
};
