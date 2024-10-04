import jwt from 'jsonwebtoken';

// Middleware para autenticação usando JWT
export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtém o token do cabeçalho

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user; // Armazena os dados do usuário na requisição
        next(); // Chama o próximo middleware ou rota
    });
};