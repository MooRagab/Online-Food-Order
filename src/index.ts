import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "./config/.env") });
import express from "express";

import connectDB from "./DB/connection";
import App from "./services/ExpreesApp";

const startServer = async () => {
  const port = process.env.PORT;
  const app = express();
  await App(app);
  app.listen(port, () => console.log(`Successfully Connect To Port ${port}!`));
  await connectDB();
};

startServer();
 