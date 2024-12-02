const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Game = sequelize.define('Game', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
        allowNull: false,
    },
    questions: {
        type: DataTypes.JSON, // IDs das perguntas associadas
        allowNull: false,
    },
});

module.exports = Game;
