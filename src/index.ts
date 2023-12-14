import path from "path";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./DB/connection";
dotenv.config({ path: path.join(__dirname, "./config/.env") });

import {
  adminRoute,
  customerRoute,
  deliveryRoute,
  shoppingRoute,
  vendorRoute,
} from "./routes/index.route";

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use("/admin", adminRoute);
app.use("/vendor", vendorRoute);
app.use("/delivery", deliveryRoute);
app.use("/customer", customerRoute);
app.use("/shopping", shoppingRoute);

connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
