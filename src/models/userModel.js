import conn from "../config/conn.js";

const tableUsers = /*sql*/ `
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

conn.query(tableUsers, (err) => {
    if (err) {
        console.error("Erro ao criar tabela [users]:", err);
        return;
    }
    console.log("Tabela [users] criada com sucesso");
});
