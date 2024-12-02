import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const RegisterStudent = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        studentCode: '',
    });

    // Busca estudantes ao montar o componente
    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${API_URL}/api/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const filteredStudents = response.data.filter(user => user.role === 'student');
                setStudents(filteredStudents);
            } catch (error) {
                console.error('Erro ao buscar estudantes:', error);
            }
        };
        fetchStudents();
    }, []);

    // Gerencia alterações no formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submete o formulário para criar um novo estudante
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${API_URL}/api/users`,
                { ...formData, role: 'student' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStudents([...students, response.data.user]); // Atualiza a lista com o novo estudante
            setFormData({ name: '', email: '', password: '', studentCode: '' }); // Limpa o formulário
            alert('Estudante cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar estudante:', error);
            alert('Erro ao cadastrar estudante. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Cadastro de Estudantes</h1>

            {/* Formulário de Cadastro */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="studentCode" className="form-label">Código do Estudante</label>
                    <input
                        type="text"
                        id="studentCode"
                        name="studentCode"
                        className="form-control"
                        value={formData.studentCode}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar Estudante</button>
            </form>

            {/* Lista de Estudantes */}
            <h2>Lista de Estudantes</h2>
            <ul className="list-group">
                {students.map((student) => (
                    <li key={student.id} className="list-group-item">
                        <strong>{student.name}</strong> - {student.email} (Código: {student.studentCode || 'N/A'})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegisterStudent;
