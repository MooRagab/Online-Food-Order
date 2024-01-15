import { Router } from "express";
import {
  confirmCustomerEmail,
  customerSignUp,
} from "../controllers/customerController";

const router = Router();

/* ------------------- Suignup / Create Customer --------------------- */
router.post("/signup", customerSignUp);

/* ------------------- Suignup / Create Customer --------------------- */
router.get("/confirmemail/:token", confirmCustomerEmail);

/* ------------------- Login --------------------- */

export { router as customerRoute };
