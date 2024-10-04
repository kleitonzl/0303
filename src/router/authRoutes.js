import { Router } from "express";
import { registerUser, loginUser } from '../controller/authController.js';

const router = Router();

// Rota para registrar usuário
router.post('/register', registerUser);

// Rota para autenticar usuário
router.post('/login', loginUser);

export default router;
