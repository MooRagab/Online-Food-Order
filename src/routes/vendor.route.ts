import { Router } from "express";
import { vendorLogin, vendor } from "../controllers/vendorController";

const router = Router();

router.get("/", vendor);
router.post("/login" ,vendorLogin)
export { router as vendorRoute };
 