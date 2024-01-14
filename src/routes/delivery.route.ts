import { Router } from "express";
import { delivery } from "../controllers";

const router = Router();

router.get("/", delivery);

export { router as deliveryRoute };
 