import { Router } from "express";
import { vendor } from "../controllers/vendorController";

const router = Router();

router.get("/", vendor);

export { router as vendorRoute };
