import express from 'express';
import { saveLocationData, logOutDate, getLocDetails, getLatAndLong } from '../controllers/location.js';

const router = express.Router();

router.patch('/save/:email', saveLocationData);
router.patch('/save/logout/:id', logOutDate);
router.get('/get/locDetails/:id', getLocDetails);
router.get('/get/latAndLong/:id', getLatAndLong);

export default router;