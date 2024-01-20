import { Router } from "express";
import { deliveryAuth } from "../middlewares";
import { deliverySignUp } from "../controllers/deliveryController";

const router = Router();

/* ------------------- Signup / Create Customer --------------------- */
router.post("/signup", deliverySignUp);

// /* ------------------- Login --------------------- */
// router.post("/login", deliveryLogin);

// /* ------------------- Authentication --------------------- */
// router.use(deliveryAuth());

// /* ------------------- Change Service Status --------------------- */
// router.put("/change-status", UpdateDeliveryUserStatus);

// /* ------------------- Profile --------------------- */
// router.get("/profile", GetDeliveryProfile);
// router.patch("/profile", EditDeliveryProfile);

export { router as deliveryRoute };
