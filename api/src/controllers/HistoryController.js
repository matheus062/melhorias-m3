const { jsPDF } = require('jspdf');
const Answer = require('../models/Answer');
const Question = require('../models/Question');

exports.exportHistory = async (req, res) => {
    const { studentId, gameId } = req.params;
    try {
        // Recupera as respostas do aluno
        const answers = await Answer.findAll({
            where: { studentId, gameId },
            include: [{ model: Question, attributes: ['text', 'options', 'correctOption'] }],
        });

        if (answers.length === 0) {
            return res.status(404).json({ error: 'No answers found for this game' });
        }

        // Gerar o PDF
        const doc = new jsPDF();
        doc.text('Student History', 10, 10);
        doc.text(`Game ID: ${gameId}`, 10, 20);
        doc.text(`Student ID: ${studentId}`, 10, 30);

        answers.forEach((answer, index) => {
            const { text, options, correctOption } = answer.Question;
            const selectedOption = answer.selectedOption;
            const status = answer.isCorrect ? 'Correct' : 'Wrong';

            doc.text(`${index + 1}. ${text}`, 10, 40 + index * 20);
            options.forEach((option, i) => {
                const prefix = i === selectedOption ? '->' : '  ';
                const correctness = i === correctOption ? '(Correct)' : '';
                doc.text(`${prefix} ${option} ${correctness}`, 15, 50 + index * 20 + i * 5);
            });
            doc.text(`Status: ${status}`, 10, 70 + index * 20);
        });

        const pdfData = doc.output();
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
