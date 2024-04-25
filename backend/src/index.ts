import express from "express";
import { createServer } from "http";
import HttpServer from "./HttpServer";
import bodyParser from "body-parser";
import { SocketServer } from "./websocket";
const app = express();
app.use(bodyParser.json());

export const server = createServer(app);

HttpServer(app);
SocketServer(server);

server.listen(4000, () => {
  console.log("server is running at http://localhost:4000");
});
