const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
    const { text, level, options, correctOption } = req.body;
    try {
        const question = await Question.create({ text, level, options, correctOption });
        res.status(201).json({ message: 'Question created successfully', question });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getQuestions = async (req, res) => {
    const { level } = req.query;
    try {
        const whereClause = level ? { level } : {};
        const questions = await Question.findAll({ where: whereClause });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findByPk(id);
        if (!question) {
            return res.status(404).json({ error: 'Pergunta não encontrada.' });
        }
        res.status(200).json(question);
    } catch (error) {
        console.error('Erro ao buscar a pergunta:', error);
        res.status(500).json({ error: 'Erro ao buscar a pergunta.' });
    }
};


exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { text, level, options, correctOption } = req.body;
    try {
        const question = await Question.findByPk(id);
        if (!question) return res.status(404).json({ error: 'Question not found' });

        await question.update({ text, level, options, correctOption });
        res.json({ message: 'Question updated successfully', question });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findByPk(id);
        if (!question) return res.status(404).json({ error: 'Question not found' });

        await question.destroy();
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
