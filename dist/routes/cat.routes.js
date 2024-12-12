"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cat_contoller_1 = require("../controllers/cat.contoller");
const router = express_1.default.Router();
const catController = new cat_contoller_1.CatController();
router.get('/:id', (req, res) => catController.getCatById(req, res));
router.get('/', (req, res) => catController.getAllCats(req, res));
router.put('/:id', (req, res) => catController.updateCat(req, res));
router.patch("/:catId/upvote", (req, res) => catController.upvoteCat(req, res));
router.post('/', (req, res) => catController.createCat(req, res));
exports.default = router;
