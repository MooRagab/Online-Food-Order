import { Router } from "express";
import {
  confirmCustomerEmail,
  customerLogin,
  customerSignUp,
} from "../controllers/customerController";

const router = Router();

/* ------------------- Suignup / Create Customer --------------------- */
router.post("/signup", customerSignUp);

/* ------------------- Suignup / Create Customer --------------------- */
router.get("/confirmemail/:token", confirmCustomerEmail);

/* ------------------- Login --------------------- */
router.post("/login", customerLogin);

export { router as customerRoute };
