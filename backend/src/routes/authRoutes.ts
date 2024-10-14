import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router(); // Asegúrate de instanciar el router

router.post('/register', register);
router.post('/login', login);

export default router;
