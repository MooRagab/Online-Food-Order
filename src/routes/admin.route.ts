import express, { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from  Admin" });
});

export default router;
