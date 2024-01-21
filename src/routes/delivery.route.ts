import { Router } from "express";
import { deliveryAuth } from "../middlewares";
import {
  confirmEmail,
  deliveryLogin,
  deliverySignUp,
  editDeliveryProfile,
  getDeliveryProfile,
  updateDeliveryUserStatus,
} from "../controllers/deliveryController";

const router = Router();

/* ------------------- Signup / Create Customer --------------------- */
router.post("/signup", deliverySignUp);

/* ------------------- Confirm Account --------------------- */
router.get("/confirmEmail/:token", confirmEmail);

// /* ------------------- Login --------------------- */
router.post("/login", deliveryLogin);

// /* ------------------- Authentication --------------------- */
router.use(deliveryAuth());

// /* ------------------- Profile --------------------- */
router.get("/profile", getDeliveryProfile);
router.patch("/profile", editDeliveryProfile);

// /* ------------------- Delivery Status --------------------- */
router.patch("/change-status", updateDeliveryUserStatus);

export { router as deliveryRoute };
