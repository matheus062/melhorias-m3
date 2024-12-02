const { jsPDF } = require('jspdf');
const Performance = require('../models/Performance');
const User = require('../models/User');

exports.exportPerformanceReport = async (req, res) => {
    const { gameId } = req.params;
    try {
        const performances = await Performance.findAll({
            where: { gameId },
            include: [{ model: User, as: 'student', attributes: ['email'] }],
            order: [['score', 'DESC']],
        });

        const doc = new jsPDF();
        doc.text('Performance Report', 10, 10);

        performances.forEach((perf, index) => {
            doc.text(`${index + 1}. ${perf.student.email} - Score: ${perf.score}`, 10, 20 + index * 10);
        });

        const pdfData = doc.output();
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
