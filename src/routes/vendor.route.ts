import { Router } from "express";
import {
  vendorLogin,
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  addFood,
  getFood,
  addProfilePic,
  getCurrentOrders,
  getOrderDetails,
  processOrder,
  addOffer,
  getOffers,
  editOffer,
} from "../controllers";
import { auth, validation } from "../middlewares";
import { fileValidation, myMulter } from "../services/Multer";
import { vendorValidator } from "../validation";

const router = Router();

/* -------------------LogIn Vendor--------------------- */
router.post("/login", validation(vendorValidator.signIn as any), vendorLogin);
/* -------------------Auth Middelware--------------------- */
router.use(auth());
/* -------------------Get Vendor Profile--------------------- */
router.get("/vendorProfile", getVendorProfile);
/* -------------------Update Vendor Profile--------------------- */
router.patch("/updatevendorprofile", updateVendorProfile);
/* -------------------Get Food--------------------- */
router.get("/vendorfood", getFood);
/* -------------------Update Vendor Service--------------------- */
router.patch("/service", updateVendorService);
/* -------------------Add Food--------------------- */
router.post("/addfood", myMulter(fileValidation).array("images", 5), addFood);
/* -------------------Put Profile Picture--------------------- */
router.post(
  "/profilepic",
  myMulter(fileValidation).single("image"),
  addProfilePic
);

//ORDERS
router.get("/orders", getCurrentOrders);
router.put("/order/:id/process", processOrder);
router.get("/order/:id", getOrderDetails);

//OFFERS
router.post("/offer", addOffer);
router.get("/offers", getOffers);
router.put("/offer/:id", editOffer);

export { router as vendorRoute };
