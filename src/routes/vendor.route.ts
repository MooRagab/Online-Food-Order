import { Router } from "express";
import {
  vendorLogin,
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  addFood,
  getFood,
  addProfilePic,
} from "../controllers";
import { auth } from "../middlewares";
import { fileValidation, myMulter } from "../services/Multer";

const router = Router();

/* -------------------LogIn Vendor--------------------- */
router.post("/login", vendorLogin);

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

export { router as vendorRoute };
