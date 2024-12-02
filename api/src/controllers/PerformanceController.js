const Performance = require('../models/Performance');
const Game = require('../models/Game');
const User = require('../models/User');

exports.recordPerformance = async (req, res) => {
    const { studentId, gameId, score } = req.body;
    try {
        const performance = await Performance.create({ studentId, gameId, score });
        res.status(201).json({ message: 'Performance recorded successfully', performance });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPerformanceByStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        const performances = await Performance.findAll({ where: { studentId } });
        res.json(performances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRankingByGame = async (req, res) => {
    const { gameId } = req.params;
    try {
        const rankings = await Performance.findAll({
            where: { gameId },
            include: [{ model: User, as: 'student', attributes: ['id', 'email'] }],
            order: [['score', 'DESC']],
        });
        res.json(rankings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
