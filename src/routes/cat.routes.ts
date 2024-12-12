import express from 'express';
import { CatController } from '../controllers/cat.contoller';

const router = express.Router();
const catController = new CatController();

router.get('/:id', (req, res) => catController.getCatById(req, res));
router.get('/', (req, res) => catController.getAllCats(req, res));
router.put('/:id', (req, res) => catController.updateCat(req, res));
router.patch("/:catId/upvote", (req, res) => catController.upvoteCat(req, res));
router.post('/', (req, res) => catController.createCat(req, res));

export default router;
