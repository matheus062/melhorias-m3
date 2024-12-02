const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
        allowNull: false,
    },
    options: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    correctOption: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Question;
