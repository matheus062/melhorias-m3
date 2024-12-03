require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const gameRoutes = require('./routes/games');
const performanceRoutes = require('./routes/performance');
const reportRoutes = require('./routes/reports');
const historyRoutes = require('./routes/history');
const {authenticate} = require('./middleware/auth');
const userRoutes = require('./routes/users'); // Importa as rotas de usuário
const progressRoutes = require('./routes/progress');
const {hash} = require("bcrypt");
const User = require('./models/User'); // Importa o modelo User

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync({force: false}) // Use `force: true` somente para desenvolvimento inicial
    .then(async () => {
        console.log('Tabelas criadas ou atualizadas com sucesso.');

        // const hashedPassword = await hash('professor123', 10); // Hash para a senha
        // await User.create({
        //     email: 'alcemar@univali.br',
        //     name: 'Professor Alcemar',
        //     password: hashedPassword,
        //     role: 'teacher', // Define o papel do usuário
        // });
        //
        // console.log('Usuário professor criado: alcemar@univali.br | Senha: professor123');

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log('Database connection error:', err));


// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes); // Adiciona o prefixo para rotas de usuários
app.use('/api/questions', authenticate, questionRoutes);
app.use('/api/games', authenticate, gameRoutes);
app.use('/api/performance', authenticate, performanceRoutes);
app.use('/api/reports', authenticate, reportRoutes);
app.use('/api/history', authenticate, historyRoutes);
app.use('/api/progress', authenticate, progressRoutes);
