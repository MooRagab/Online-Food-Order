import { Router } from "express";
import { shopping } from "../controllers/shoppingController";

const router = Router();

router.get("/", shopping);

export { router as shoppingRoute };
