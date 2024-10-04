import conn from '../config/conn.js';

const eventoModel = `
CREATE TABLE IF NOT EXISTS eventos (
    evento_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

conn.query(eventoModel, (err, results) => {
    if (err) throw err;
    console.log('Tabela [eventos] criada com sucesso');
});
