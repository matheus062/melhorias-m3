const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/QuestionController');

// CRUD de perguntas
router.post('/', QuestionController.createQuestion);
router.get('/', QuestionController.getQuestions);
router.get('/:id', QuestionController.getQuestion);
router.put('/:id', QuestionController.updateQuestion);
router.delete('/:id', QuestionController.deleteQuestion);

module.exports = router;
