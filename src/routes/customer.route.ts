import { Router } from "express";
import {
  confirmCustomerEmail,
  createOrder,
  customerLogin,
  customerSignUp,
  deleteCart,
  editCustomerProfile,
  getCart,
  getCustomerProfile,
  getOrderById,
  getOrders,
  addToCart,
  verifyOffer,
  createPayment,
} from "../controllers/customerController";
import { customerAuth, validation } from "../middlewares";
import { customerValidator, orderValidator } from "../validation";

const router = Router();

//CUSTOMER
/* ------------------- Signup / Create Customer --------------------- */
router.post(
  "/signup",
  validation(customerValidator.signUp as any),
  customerSignUp
);
/* ------------------- Suignup / Create Customer --------------------- */
router.get("/confirmemail/:token", confirmCustomerEmail);
/* ------------------- Login --------------------- */
router.post(
  "/login",
  validation(customerValidator.signIn as any),
  customerLogin
);
/* ------------------- Auth Middelware --------------------- */
router.use(customerAuth());
/* ------------------- Customer profile --------------------- */
router.get("/profile", getCustomerProfile);
/* ------------------- Edit Customer profile --------------------- */
router.patch("/editprofile", editCustomerProfile);

//CART
/* ------------------- Add To Your Cart --------------------- */
router.post("/cart", addToCart);
/* ------------------- Get Cart --------------------- */
router.get("/cart", getCart);
/* ------------------- Delete Cart --------------------- */
router.delete("/cart", deleteCart);

//ORDER
/* ------------------- Create Order --------------------- */
router.post(
  "/createorder",
  validation(orderValidator.createOrder as any),
  createOrder
);
/* ------------------- Get Order --------------------- */
router.get("/orders", getOrders);
/* ------------------- Get Order By ID --------------------- */
router.get("/order/:id", getOrderById);

//OFFERS
router.get("/offer/verify/:id", verifyOffer);

//PAYMENT
router.post("/create-payment", createPayment);

export { router as customerRoute };
