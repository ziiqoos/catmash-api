"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatController = void 0;
const cat_service_1 = require("../services/cat.service");
const db_mongodb_1 = require("../config/db.mongodb");
class CatController {
    constructor() {
        (0, db_mongodb_1.connect)();
        this.catService = new cat_service_1.CatService();
    }
    getCatById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cat = yield this.catService.getCatById(req.params.id);
                if (!cat) {
                    res.status(404).json({ message: 'Cat not found' });
                }
                else {
                    res.status(200).json(cat);
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getAllCats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sort } = req.query;
                const sortOrder = sort === 'desc' ? -1 : sort === 'asc' ? 1 : undefined;
                const cats = yield this.catService.getAllCats(sortOrder);
                res.status(200).json(cats);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    createCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cat = yield this.catService.createCat(req.body);
                res.status(201).json(cat);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    updateCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCat = yield this.catService.updateCat(req.params.id, req.body);
                if (!updatedCat) {
                    res.status(404).json({ message: 'Cat not found' });
                }
                else {
                    res.status(200).json(updatedCat);
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    upvoteCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { catId } = req.params;
            try {
                const updatedCat = yield this.catService.upvoteCat(catId);
                res.status(200).json({ message: "Cat upvoted successfully", data: updatedCat });
            }
            catch (error) {
                if (error.message === "Cat not found") {
                    res.status(404).json({ message: "Cat not found" });
                }
                else {
                    console.error("Error upvoting the cat:", error);
                    res.status(500).json({ message: "Internal server error", error: error.message });
                }
            }
        });
    }
}
exports.CatController = CatController;
