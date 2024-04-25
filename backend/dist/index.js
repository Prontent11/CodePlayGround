"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const HttpServer_1 = __importDefault(require("./HttpServer"));
const body_parser_1 = __importDefault(require("body-parser"));
const websocket_1 = require("./websocket");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
exports.server = (0, http_1.createServer)(app);
(0, HttpServer_1.default)(app);
(0, websocket_1.SocketServer)(exports.server);
exports.server.listen(4000, () => {
    console.log("server is running at http://localhost:4000");
});
//# sourceMappingURL=index.js.map