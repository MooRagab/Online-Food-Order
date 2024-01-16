import { Router } from "express";
import {
  confirmCustomerEmail,
  customerLogin,
  customerSignUp,
  editCustomerProfile,
  getCustomerProfile,
} from "../controllers/customerController";
import { customerAuth } from "../middlewares";

const router = Router();

/* ------------------- Suignup / Create Customer --------------------- */
router.post("/signup", customerSignUp);

/* ------------------- Suignup / Create Customer --------------------- */
router.get("/confirmemail/:token", confirmCustomerEmail);

/* ------------------- Login --------------------- */
router.post("/login", customerLogin);

/* ------------------- Auth Middelware --------------------- */
router.use(customerAuth());

/* ------------------- Customer profile --------------------- */
router.post("/profile", getCustomerProfile);

/* ------------------- Edit Customer profile --------------------- */
router.post("/editprofile", editCustomerProfile);

export { router as customerRoute };
