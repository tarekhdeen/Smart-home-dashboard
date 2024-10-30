import { Router } from 'express';
import {
    getAllDevices,
    addDevice,
    deleteDevice,
    toggleDevice,
    updateDeviceSettings,
    setBlindsPosition,
    toggleLock,
    toggleRecording
    } from '../controllers/deviceController.js';

const router = Router();

    router.get('/', getAllDevices);
    router.post('/add', addDevice);
    router.delete('/:_id', deleteDevice);
    router.post('/:id/toggle', toggleDevice);
    router.post('/:id/settings', updateDeviceSettings);
    router.post('/:id/blinds/position', setBlindsPosition);
    router.post('/:id/lock/toggle', toggleLock);
    router.post('/:id/camera/recording', toggleRecording);


export default router;
