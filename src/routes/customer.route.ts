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
} from "../controllers/customerController";
import { customerAuth } from "../middlewares";

const router = Router();

/* ------------------- Signup / Create Customer --------------------- */
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

//CART
/* ------------------- Add To Your Cart --------------------- */
router.post("/cart", addToCart);
/* ------------------- Get Cart --------------------- */
router.get("/cart", getCart);
/* ------------------- Delete Cart --------------------- */
router.delete("/cart", deleteCart);

//ORDER
/* ------------------- Create Order --------------------- */
router.post("/createorder", createOrder);

/* ------------------- Get Order --------------------- */
router.get("/orders", getOrders);

/* ------------------- Get Order By ID --------------------- */
router.get("/order/:id", getOrderById);

export { router as customerRoute };
