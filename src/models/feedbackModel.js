import conn from '../config/conn.js';

const feedbackModel = `
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    participante_id INT,
    evento_id INT,
    nota INT NOT NULL,
    comentario TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participante_id) REFERENCES participantes(participante_id),
    FOREIGN KEY (evento_id) REFERENCES eventos(evento_id)
);
`;

conn.query(feedbackModel, (err, results) => {
    if (err) throw err;
    console.log('Tabela [feedback] criada com sucesso');
});
