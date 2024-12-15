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
exports.CatService = void 0;
const cat_repository_1 = require("../repositories/cat.repository");
class CatService {
    constructor() {
        this.catRepository = new cat_repository_1.CatRepository();
    }
    getCatById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.catRepository.getCatById(id);
        });
    }
    getAllCats(sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.catRepository.getAllCats(sortOrder);
        });
    }
    upvoteCat(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCat = yield this.catRepository.upvoteCatById(catId);
            if (!updatedCat) {
                throw new Error("Cat not found");
            }
            return updatedCat;
        });
    }
}
exports.CatService = CatService;
