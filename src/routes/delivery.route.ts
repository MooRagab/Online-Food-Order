import { Router } from "express";
import { deliveryAuth, validation } from "../middlewares";
import {
  confirmEmail,
  deliveryLogin,
  deliverySignUp,
  editDeliveryProfile,
  getDeliveryProfile,
  updateDeliveryUserStatus,
} from "../controllers/deliveryController";
import { deliveryValidator } from "../validation";

const router = Router();

/* ------------------- Signup / Create Customer --------------------- */
router.post(
  "/signup",
  validation(deliveryValidator.signUp as any),
  deliverySignUp
);

/* ------------------- Confirm Account --------------------- */
router.get("/confirmEmail/:token", confirmEmail);

// /* ------------------- Login --------------------- */
router.post(
  "/login",
  validation(deliveryValidator.signIn as any),
  deliveryLogin
);

// /* ------------------- Authentication --------------------- */
router.use(deliveryAuth());

// /* ------------------- Profile --------------------- */
router.get("/profile", getDeliveryProfile);
router.patch("/profile", editDeliveryProfile);

// /* ------------------- Delivery Status --------------------- */
router.patch("/change-status", updateDeliveryUserStatus);

export { router as deliveryRoute };
