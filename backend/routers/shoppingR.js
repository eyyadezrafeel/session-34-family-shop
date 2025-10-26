import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getOrCreateShoppingList,
    archiveList,
    getArchivedLists,
}from '../controllers/shoppingListC.js';

const router = express.Router();

router.get("/",protect,getOrCreateShoppingList);
router.post("/archiveList",protect,archiveList);
router.post("/archivedList",protect,getArchivedLists);

export default router;