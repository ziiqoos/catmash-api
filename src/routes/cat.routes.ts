import express from 'express';
import { CatController } from '../controllers/cat.contoller';

const router = express.Router();
const catController = new CatController();

router.get('/:id', (req, res) => catController.getCatById(req, res));
router.get('/', (req, res) => catController.getAllCats(req, res));
router.patch("/:catId/upvote", (req, res) => catController.upvoteCat(req, res));

export default router;
