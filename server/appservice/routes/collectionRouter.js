import express from 'express';
import { addToCollection } from '../controllers/collectionController.js';
const router = express.Router();

router.post('/add-to-collection', addToCollection);

export default router;
