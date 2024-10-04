import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import conn from '../config/conn.js';

// Registrar novo usuário
export const registerUser = (req, res) => {
    const { nome, email, password } = req.body;

    // Hash a senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (nome, email, password) VALUES (?, ?, ?)';
    conn.query(sql, [nome, email, hashedPassword], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
};

// Autenticar usuário
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Autenticação falhou' });
        }

        const user = results[0];

        // Verificar a senha
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Autenticação falhou' });
        }

        // Criar token JWT
        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    });
};
