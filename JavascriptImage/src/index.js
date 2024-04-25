import express from "express";
import bodyParser from "body-parser";
import { callingfunc } from "./newindex.js";
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    "hello there im docker container ok bhai ok let's see one this will always happen my dear friend more time one more time bhai ek or try kar"
  );
});
callingfunc(app);
app.get("/calculate", (req, res) => {
  const { a, b } = req.body;
  res.send(a + b);
});

app.listen(8080, () => {
  console.log("server is running http://localhost:8080");
});
