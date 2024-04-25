import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import { fetchDir, fetchFileContent, updateFileContent } from "./fileHandling";
import { exec } from "child_process";
import { TerminalCommandExecution } from "./terminal";
export function SocketServer(server) {
  const io = new Server(server, {
    cors: {
      // Should restrict this more!
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    //filecreate
    socket.on("updateContent", async (filePath, Content) => {
      const dirPath = path.join(
        "C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes",
        `/${playgroundName}/${filePath}`
      );
      console.log(filePath);
      console.log(Content);
      const response = await updateFileContent(dirPath, Content);
      console.log(response);
    });
    //fetch folders
    const playgroundName = socket.handshake.query.roomId as string;
    console.log(playgroundName);
    socket.on("fetchFolder", async (dir: string) => {
      const dirPath = path.join(
        "C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes",
        `/${playgroundName}/${dir}`
      );
      const contents = await fetchDir(dirPath, dir);
      // callback(contents);
      console.log(contents);
    });
    socket.on("fetchFileData", async (filePath) => {
      const dirPath = path.join(
        "C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes",
        `/${playgroundName}/${filePath}`
      );
      const content = await fetchFileContent(dirPath);
      // console.log(callback);
      // callback(content);
      console.log(content);
    });
    socket.on("createFolder ", (filePath, callback) => {});
    socket.on("createFile", (filePath, callback) => {});
    socket.on("deleteFile", (filePath, callback) => {});
    socket.on("delteFolder", (filePath, callback) => {});

    socket.on("executeCommand", (playgroundName, command) => {
      const terminalOutput = TerminalCommandExecution(playgroundName, command);
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
