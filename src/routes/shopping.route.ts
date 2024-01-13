import { Router } from "express";
import { getFoodAvailability } from "../controllers/shoppingController";

const router = Router();

router.get("/:pincode", getFoodAvailability);

export { router as shoppingRoute };
