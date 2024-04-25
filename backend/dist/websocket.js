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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const fileHandling_1 = require("./fileHandling");
const terminal_1 = require("./terminal");
function SocketServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            // Should restrict this more!
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        //filecreate
        socket.on("updateContent", (filePath, Content) => __awaiter(this, void 0, void 0, function* () {
            const dirPath = path_1.default.join("C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes", `/${playgroundName}/${filePath}`);
            console.log(filePath);
            console.log(Content);
            const response = yield (0, fileHandling_1.updateFileContent)(dirPath, Content);
            console.log(response);
        }));
        //fetch folders
        const playgroundName = socket.handshake.query.roomId;
        console.log(playgroundName);
        socket.on("fetchFolder", (dir) => __awaiter(this, void 0, void 0, function* () {
            const dirPath = path_1.default.join("C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes", `/${playgroundName}/${dir}`);
            const contents = yield (0, fileHandling_1.fetchDir)(dirPath, dir);
            // callback(contents);
            console.log(contents);
        }));
        socket.on("fetchFileData", (filePath) => __awaiter(this, void 0, void 0, function* () {
            const dirPath = path_1.default.join("C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes", `/${playgroundName}/${filePath}`);
            const content = yield (0, fileHandling_1.fetchFileContent)(dirPath);
            // console.log(callback);
            // callback(content);
            console.log(content);
        }));
        socket.on("createFolder ", (filePath, callback) => { });
        socket.on("createFile", (filePath, callback) => { });
        socket.on("deleteFile", (filePath, callback) => { });
        socket.on("delteFolder", (filePath, callback) => { });
        socket.on("executeCommand", (playgroundName, command) => {
            const terminalOutput = (0, terminal_1.TerminalCommandExecution)(playgroundName, command);
            console.log(terminalOutput.output);
        });
        // socket.on("exec:command", () => {});
        //foldercreate
        //deltefile
        //deltefolder
        //terminal start
        //terminal destroy
        //terminal execl command
    });
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=websocket.js.map