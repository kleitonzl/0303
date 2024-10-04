import conn from '../config/conn.js';

// Tabela Palestrante
const createPalestranteTable = `
CREATE TABLE IF NOT EXISTS palestrante (
    palestrante_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
`;

// Tabela Participante
const createParticipanteTable = `
CREATE TABLE IF NOT EXISTS participantes (
    participante_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
`;

// Tabela Evento
const createEventoTable = `
CREATE TABLE IF NOT EXISTS eventos (
    evento_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

// Tabela Associação entre Participantes e Eventos
const createEventosParticipantesTable = `
CREATE TABLE IF NOT EXISTS eventos_participantes (
    evento_id INT,
    participante_id INT,
    PRIMARY KEY (evento_id, participante_id),
    FOREIGN KEY (evento_id) REFERENCES eventos(evento_id),
    FOREIGN KEY (participante_id) REFERENCES participantes(participante_id)
);
`;

// Tabela Feedback
const createFeedbackTable = `
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

// Executar as criações das tabelas
conn.query(createPalestranteTable, (err) => {
    if (err) throw err;
    console.log('Tabela [palestrante] criada com sucesso');
});

conn.query(createParticipanteTable, (err) => {
    if (err) throw err;
    console.log('Tabela [participantes] criada com sucesso');
});

conn.query(createEventoTable, (err) => {
    if (err) throw err;
    console.log('Tabela [eventos] criada com sucesso');
});

conn.query(createEventosParticipantesTable, (err) => {
    if (err) throw err;
    console.log('Tabela [eventos_participantes] criada com sucesso');
});

conn.query(createFeedbackTable, (err) => {
    if (err) throw err;
    console.log('Tabela [feedback] criada com sucesso');
});

conn.end();
