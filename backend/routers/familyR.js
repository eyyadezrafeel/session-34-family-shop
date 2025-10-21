import express from 'express';
import { createFamily,joinFamily } from '../controllers/familyC.js';

const router = express.Router();

router.post('/createFamily',createFamily);
router.post('/joinFamily',joinFamily);

export default router;