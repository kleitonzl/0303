import express from 'express';
import { criarEvento, listarEventos } from '../controller/eventoController.js';
import { enviarFeedback } from '../controller/feedbackController.js';
import { basicAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/criar', basicAuth, criarEvento); // Protegido por autenticação
router.get('/agenda', listarEventos); // Acesso livre
router.post('/feedback', enviarFeedback); // Protegido por autenticação básica

export default router;
