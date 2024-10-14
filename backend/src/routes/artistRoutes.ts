import { Router } from 'express';
import { getArtists, getArtist, addArtist, modifyArtist, removeArtist } from '../controllers/artistController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router(); // Instanciación correcta

router.get('/', authenticateToken, getArtists);
router.get('/:id', authenticateToken, getArtist);
router.post('/', authenticateToken, addArtist);
router.put('/:id', authenticateToken, modifyArtist);
router.delete('/:id', authenticateToken, removeArtist);

export default router;
