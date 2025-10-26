import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import { addItem,updateItemStatus,getItems } from '../controllers/itemC.js';

const router = express.Router();

router.post('/',protect,addItem);
router.post('/updateItemStatus',protect,updateItemStatus);
router.get("/",protect,getItems);

export default router;