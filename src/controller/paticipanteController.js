import conn from '../config/conn.js';

export const registrarParticipante = (req, res) => {
    const { nome, email } = req.body;
    const sql = 'INSERT INTO participantes (nome, email) VALUES (?, ?)';

    conn.query(sql, [nome, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Participante registrado com sucesso!', id: result.insertId });
    });
};

export const listarMeusEventos = (req, res) => {
    const { participanteId } = req.query;
    const sql = `
        SELECT e.* FROM eventos e
        JOIN eventos_participantes ep ON e.evento_id = ep.evento_id
        WHERE ep.participante_id = ?;
    `;

    conn.query(sql, [participanteId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};
