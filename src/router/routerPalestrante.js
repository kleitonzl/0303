import { Router } from "express";
import { authenticateToken } from '../middleware/authMiddleware.js'; // Importa o middleware

const router = Router();

// Rota para listar todos os palestrantes, protegida pelo middleware
router.get('/', authenticateToken, (req, res) => {
    const sql = `SELECT * FROM palestrantes`;

    conn.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Outras rotas...

export default router;
