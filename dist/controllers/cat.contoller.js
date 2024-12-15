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
const logger_1 = require("../utils/logger");
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
                    logger_1.logger.httpError('GET', `/api/cats/${req.params.id}`, 'N/A', 404, 'Entity not found');
                    res.status(404).json({ message: 'Cat not found' });
                }
                else {
                    logger_1.logger.httpInfo('GET', `/api/cats/${req.params.id}`, 'N/A', 200);
                    res.status(200).json(cat);
                }
            }
            catch (err) {
                const error = err;
                logger_1.logger.httpError('GET', `/api/cats/${req.params.id}`, 'N/A', 500, error.message);
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
                logger_1.logger.httpInfo('GET', `/api/cats`, 'N/A', 200);
                res.status(200).json(cats);
            }
            catch (err) {
                const error = err;
                logger_1.logger.httpInfo('GET', `/api/cats`, 'N/A', 500);
                res.status(500).json({ error: error.message });
            }
        });
    }
    upvoteCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { catId } = req.params;
            try {
                const updatedCat = yield this.catService.upvoteCat(catId);
                logger_1.logger.httpInfo('PATCH', `/api/cats/${catId}`, 'N/A', 200);
                res.status(200).json({ message: "Cat upvoted successfully", data: updatedCat });
            }
            catch (err) {
                const error = err;
                if (error.message === "Cat not found") {
                    logger_1.logger.httpError('PATCH', `/api/cats/${catId}`, 'N/A', 404, error.message);
                    res.status(404).json({ message: "Cat not found" });
                }
                else {
                    console.error("Error upvoting the cat:", error);
                    logger_1.logger.httpError('PATCH', `/api/cats/${catId}`, 'N/A', 500, error.message);
                    res.status(500).json({ message: "Internal server error", error: error.message });
                }
            }
        });
    }
}
exports.CatController = CatController;
