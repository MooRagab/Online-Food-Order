import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "../src/config/.env" });
import express from "express";
import connectDB from "./DB/connection";

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use("/", (req, res) => {
  res.json({ message: "Hello From Food Order !!" });
});

connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
