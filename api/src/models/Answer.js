const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Answer = sequelize.define('Answer', {
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    selectedOption: {
        type: DataTypes.INTEGER,
        allowNull: false, // Índice da opção selecionada (0 a 4)
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // Indica se a resposta foi correta
    },
});

module.exports = Answer;
