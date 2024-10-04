import conn from '../config/conn.js';

export const criarPalestrante = (req, res) => {
    const { nome, email } = req.body;
    const sql = 'INSERT INTO palestrante (nome, email) VALUES (?, ?)';

    conn.query(sql, [nome, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Palestrante criado com sucesso!', id: result.insertId });
    });
};

export const listarPalestrantes = (req, res) => {
    const sql = 'SELECT * FROM palestrante';

    conn.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};
