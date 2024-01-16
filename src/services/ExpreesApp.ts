import express, { Application, Response } from "express";
import {
  adminRoute,
  customerRoute,
  deliveryRoute,
  shoppingRoute,
  vendorRoute,
} from "../routes/index.routes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/admin", adminRoute);
  app.use("/vendor", vendorRoute);
  app.use("/delivery", deliveryRoute);
  app.use("/customer", customerRoute);
  app.use("/shopping", shoppingRoute);
  app.use("*", (res: Response) => {
    res.status(404).json({ message: "404 Page Not Found" });
  });

  return app;
};
