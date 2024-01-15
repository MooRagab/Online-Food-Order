import { Router } from "express";
import {
  confirmCustomerEmail,
  customerLogin,
  customerSignUp,
  getCustomerProfile,
} from "../controllers/customerController";
import { auth } from "../middlewares";

const router = Router();

/* ------------------- Suignup / Create Customer --------------------- */
router.post("/signup", customerSignUp);

/* ------------------- Suignup / Create Customer --------------------- */
router.get("/confirmemail/:token", confirmCustomerEmail);

/* ------------------- Login --------------------- */
router.post("/login", customerLogin);

/* ------------------- Auth Middelware --------------------- */
router.use(auth());
/* ------------------- Customer profile --------------------- */
router.post("/profile", getCustomerProfile);

export { router as customerRoute };
