import path from "path";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./DB/connection";
import { adminRoute, vendorRoute } from "./routes/index.route";

dotenv.config({ path: path.join(__dirname, "./config/.env") });

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use("/admin", adminRoute);
app.use("/vendor", vendorRoute);

connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
