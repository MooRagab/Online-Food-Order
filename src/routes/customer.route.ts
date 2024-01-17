import { Router } from "express";
import {
  confirmCustomerEmail,
  createOrder,
  customerLogin,
  customerSignUp,
  editCustomerProfile,
  getCustomerProfile,
  getOrderById,
  getOrders,
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
router.get("/profile", getCustomerProfile);

/* ------------------- Edit Customer profile --------------------- */
router.patch("/editprofile", editCustomerProfile);

/* ------------------- Create Order --------------------- */
router.post("/createorder", createOrder);

/* ------------------- Get Order --------------------- */
router.get("/orders", getOrders);

/* ------------------- Get Order By ID --------------------- */
router.get("/order/:id", getOrderById);

export { router as customerRoute };
