import express from 'express';
import { getServerRun } from '../controllers/testC';

const router = express.Router();

router.get('/',getServerRun)

export default router;