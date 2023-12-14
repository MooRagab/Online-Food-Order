import { Router } from "express";
import { admin } from "../controllers/adminController";

const router = Router();

router.get("/", admin);

export { router as adminRoute };
