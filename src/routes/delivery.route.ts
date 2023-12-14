import { Router } from "express";
import { delivery } from "../controllers/deliveryController";

const router = Router();

router.get("/", delivery);

export { router as deliveryRoute };
 