import { Router } from 'express';
import { getAllDevices, addDevice, deleteDevice, toggleDevice } from '../controllers/deviceController.js';

const router = Router();

router.get('/', getAllDevices);
router.post('/add', addDevice);
router.delete('/:_id', deleteDevice);
router.post('/:id/toggle/', toggleDevice);

export default router;
