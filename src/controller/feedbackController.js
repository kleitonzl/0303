import conn from '../config/conn.js';

export const enviarFeedback = (req, res) => {
    const { participanteId, eventoId, nota, comentario } = req.body;
    const sql = 'INSERT INTO feedback (participante_id, evento_id, nota, comentario) VALUES (?, ?, ?, ?)';

    conn.query(sql, [participanteId, eventoId, nota, comentario], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Feedback enviado com sucesso!' });
    });
};
