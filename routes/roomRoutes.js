import { Router } from 'express';
import { getAllRooms, addRoom } from '../controllers/roomController.js';
const router = Router();

router.get('/', getAllRooms);
router.post('/add', addRoom);

export default router;
