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
exports.CatRepository = void 0;
const db_dynamodb_1 = require("../config/db.dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class CatRepository {
    constructor() {
        this.tableName = 'cats';
    }
    // Get a cat by ID
    getCatById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const command = new lib_dynamodb_1.QueryCommand({
                TableName: this.tableName,
                KeyConditionExpression: 'id = :id',
                ExpressionAttributeValues: {
                    ':id': id,
                },
            });
            const response = yield db_dynamodb_1.dynamoDB.send(command);
            return ((_a = response.Items) === null || _a === void 0 ? void 0 : _a[0]) || null;
        });
    }
    // Get all cats
    getAllCats() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new lib_dynamodb_1.ScanCommand({
                TableName: this.tableName,
            });
            const response = yield db_dynamodb_1.dynamoDB.send(command);
            return response.Items || [];
        });
    }
    upvoteCatById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new lib_dynamodb_1.UpdateCommand({
                TableName: this.tableName,
                Key: {
                    id
                },
                UpdateExpression: 'SET score = if_not_exists(score, :default) + :increment',
                ExpressionAttributeValues: {
                    ':increment': 1,
                    ':default': 0,
                },
                ReturnValues: 'ALL_NEW',
            });
            const response = yield db_dynamodb_1.dynamoDB.send(command);
            return response.Attributes;
        });
    }
}
exports.CatRepository = CatRepository;
