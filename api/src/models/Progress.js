const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Progress = sequelize.define('Progress', {
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    correctAnswers: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    medal: {
        type: DataTypes.ENUM('bronze', 'silver', 'gold'),
        defaultValue: null,
    },
});

module.exports = Progress;
