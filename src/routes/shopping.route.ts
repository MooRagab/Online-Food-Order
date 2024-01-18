import { Router } from "express";
import {
  getFoodsIn30Min,
  getFoodAvailability,
  getTopRestaurants,
  searchFoods,
  restaurantById,
  getAvailableOffers,
} from "../controllers";

const router = Router();

/* ------------------- Food Availability --------------------- */
router.get("/:pincode", getFoodAvailability);

/* ------------------- Top Restaurant --------------------- */
router.get("/toprestaurant/:pincode", getTopRestaurants);

/* ------------------- Food Available in 30 Minutes --------------------- */
router.get("/foods-in-30-min/:pincode", getFoodsIn30Min);

/* ------------------- Search Foods --------------------- */
router.get("/searchfoods/:pincode", searchFoods);
/* ------------------- Search Foods --------------------- */
router.get("/offers/:pincode" , getAvailableOffers);

/* ------------------- Find Restaurant by ID --------------------- */
router.get("/restaurant/:id", restaurantById);

export { router as shoppingRoute };
