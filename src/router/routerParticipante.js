import express from 'express';
import { registrarParticipante, listarMeusEventos } from '../controller/paticipanteController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/registrar', registrarParticipante); // Acesso livre
router.get('/meus-eventos', authenticateToken, listarMeusEventos); // Protegido por autenticação básica

export default router;
