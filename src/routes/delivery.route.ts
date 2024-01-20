import { Router } from "express";
import { deliveryAuth } from "../middlewares";
import {
  confirmEmail,
  deliverySignUp,
} from "../controllers/deliveryController";

const router = Router();

/* ------------------- Signup / Create Customer --------------------- */
router.post("/signup", deliverySignUp);

/* ------------------- Confirm Account --------------------- */
router.get("/confirmEmail/:token", confirmEmail);

// /* ------------------- Login --------------------- */
// router.post("/login", deliveryLogin);

// /* ------------------- Authentication --------------------- */
router.use(deliveryAuth());

// /* ------------------- Change Service Status --------------------- */
// router.put("/change-status", UpdateDeliveryUserStatus);

// /* ------------------- Profile --------------------- */
// router.get("/profile", GetDeliveryProfile);
// router.patch("/profile", EditDeliveryProfile);

export { router as deliveryRoute };
