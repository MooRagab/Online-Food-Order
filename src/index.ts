//Dotenv setup
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "./config/.env") });

import express from "express";
import bodyParser from "body-parser";
import connectDB from "./DB/connection";
import {
  adminRoute,
  customerRoute,
  deliveryRoute,
  shoppingRoute,
  vendorRoute,
} from "./routes/index.routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 5000;

//Routes

app.use("/admin", adminRoute);
app.use("/vendor", vendorRoute);
app.use("/delivery", deliveryRoute);
app.use("/customer", customerRoute);
app.use("/shopping", shoppingRoute);

//In-Valid Routings
app.use("*", (req, res) => {
  res.status(404).json({ message: "404 Page Not Found" });
});

//Connections
connectDB();
app.listen(port, () => console.log(`Successfully Connect To Port ${port}!`));
