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
exports.HttpServer = void 0;
// import { exec } from "child_process";
const child_process_1 = require("child_process");
const fileHandling_1 = require("./fileHandling");
function HttpServer(app) {
    app.post("/createProject", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { username, projectType } = req.body;
        // Validate project type (for demo, only supporting "react" for now)
        if (projectType !== "react") {
            return res
                .status(400)
                .json({ success: false, message: "Unsupported project type" });
        }
        const ProjectName = `${username + projectType + Date.now()}`;
        const ProjectPath = yield (0, fileHandling_1.copyFolder)("JsCode", `${ProjectName}`);
        console.log(ProjectPath, ProjectName);
        // res.json({ success: true, message: "Folder copied", data: ProjectName });
        (0, child_process_1.exec)(`docker run -v C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes/${ProjectName}/:/src/src/  -p 4040:8080 --name ${ProjectName} js-runtime-image`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ success: false, message: "Error creating project" });
            }
            console.log(stdout);
            console.error(stderr);
            res.status(200).json({
                success: true,
                message: "Project created successfully",
                data: ProjectName,
            });
        });
    }));
}
exports.HttpServer = HttpServer;
exports.default = HttpServer;
//# sourceMappingURL=HttpServer.js.map