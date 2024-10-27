import { Router } from 'express';
import { getAllDevices, addDevice, deleteDevice } from '../controllers/deviceController.js';

const router = Router();

router.get('/', getAllDevices);
router.post('/add', addDevice);
router.delete('/:_id', deleteDevice);

export default router;
