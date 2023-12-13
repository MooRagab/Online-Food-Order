import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/config/.env" });
import express from "express";
import connectDB from "./DB/connection";
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 