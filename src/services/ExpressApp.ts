import express, { Application, Request, Response } from "express";
import cors from 'cors'
import {
  adminRoute,
  customerRoute,
  deliveryRoute,
  shoppingRoute,
  vendorRoute,
} from "../routes/index.routes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(cors({}))
  app.use(express.urlencoded({ extended: true }));

  app.use("/admin", adminRoute);
  app.use("/vendor", vendorRoute);
  app.use("/delivery", deliveryRoute);
  app.use("/customer", customerRoute);
  app.use("/shopping", shoppingRoute);
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "404 Page Not Found" });
  });

  return app;
};
