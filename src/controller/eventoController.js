import conn from '../config/conn.js';

export const criarEvento = (req, res) => {
    const { titulo, data, palestrantesId } = req.body;
    const sql = 'INSERT INTO eventos (titulo, data) VALUES (?, ?)';

    conn.query(sql, [titulo, data], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const eventoId = result.insertId;
        if (palestrantesId && palestrantesId.length > 0) {
            const sqlAssoc = 'INSERT INTO eventos_palestrantes (evento_id, palestrante_id) VALUES ?';
            const values = palestrantesId.map(id => [eventoId, id]);

            conn.query(sqlAssoc, [values], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Evento criado com sucesso!', id: eventoId });
            });
        } else {
            res.status(201).json({ message: 'Evento criado com sucesso!', id: eventoId });
        }
    });
};

export const listarEventos = (req, res) => {
    const sql = `
    SELECT e.*, GROUP_CONCAT(p.nome) AS palestrantes 
    FROM eventos e
    LEFT JOIN eventos_palestrantes ep ON e.evento_id = ep.evento_id
    LEFT JOIN palestrante p ON ep.palestrante_id = p.palestrante_id
    GROUP BY e.evento_id;
    `;

    conn.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};
