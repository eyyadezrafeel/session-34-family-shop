import express from 'express';
import { createFamily,joinFamily } from '../controllers/familyC.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create',protect,createFamily);
router.post('/join',protect,joinFamily);

export default router;