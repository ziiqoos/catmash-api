"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cat_routes_1 = __importDefault(require("./routes/cat.routes"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api/cats', cat_routes_1.default);
app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to catmash-api!' });
});
// Launch the app on designated port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
    logger_1.logger.info('Application start');
});
// Log the server errors
server.on('error', (error) => {
    console.log(error);
    logger_1.logger.error(`An error occured : ${error}`);
});
exports.default = app;
