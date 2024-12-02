const Progress = require('../models/Progress');
const Question = require('../models/Question');
const Game = require('../models/Game');

// Verifica ou inicia o progresso de um aluno em um jogo
exports.startQuizOrGetProgress = async (req, res) => {
    const { studentId, gameId } = req.body;

    try {

        // Busca o jogo e suas perguntas
        const game = await Game.findByPk(gameId);

        if (!game) {
            return res.status(404).json({ error: 'Jogo não encontrado.' });
        }

        const questionIds = game.questions; // IDs das perguntas associadas ao jogo
        const questions = await Question.findAll({
            where: { id: questionIds },
        });

        let progress = await Progress.findOne({ where: { studentId, gameId }});

        if (progress) {
            // Retorna o progresso existente
            return res.status(200).json({
                completed: true,
                progress: progress,
                questions: questions
            });
        }

        // Cria um novo progresso para o aluno
        await Progress.create({ studentId, gameId, correctAnswers: []});

        res.status(200).json({
            completed: false,
            questions,
        });
    } catch (error) {
        console.error('Erro ao iniciar ou verificar o progresso:', error);
        res.status(500).json({ error: 'Erro ao iniciar ou verificar o progresso.' });
    }
};

// Atualiza o progresso do aluno
exports.updateProgress = async (req, res) => {
    const { studentId, gameId, score, phase, medal, correctAnswers } = req.body;

    try {
        const progress = await Progress.findOne({ where: { studentId, gameId } });

        if (!progress) {
            return res.status(404).json({ error: 'Progresso não encontrado.' });
        }

        // Atualiza os campos do progresso
        progress.score = score;
        progress.phase = phase;
        progress.medal = medal;
        progress.correctAnswers = correctAnswers;
        await progress.save();

        res.status(200).json({ message: 'Progresso atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar o progresso:', error);
        res.status(500).json({ error: 'Erro ao atualizar o progresso.' });
    }
};

// Retorna todos os progressos de um aluno
exports.getProgressByStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const progress = await Progress.findAll({ where: { studentId } });

        if (!progress.length) {
            return res.status(404).json({ error: 'Nenhum progresso encontrado para este aluno.' });
        }

        res.status(200).json(progress);
    } catch (error) {
        console.error('Erro ao buscar os progressos:', error);
        res.status(500).json({ error: 'Erro ao buscar os progressos.' });
    }
};

// Retorna o progresso específico de um aluno em um jogo
exports.getProgressByGame = async (req, res) => {
    const { studentId, gameId } = req.params;

    try {
        const progress = await Progress.findOne({ where: { studentId, gameId } });

        if (!progress) {
            return res.status(404).json({ error: 'Progresso não encontrado para este jogo.' });
        }

        res.status(200).json(progress);
    } catch (error) {
        console.error('Erro ao buscar o progresso:', error);
        res.status(500).json({ error: 'Erro ao buscar o progresso.' });
    }
};
