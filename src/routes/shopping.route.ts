import { Router } from "express";
import {
  getFoodsIn30Min,
  getFoodAvailability,
  getTopRestaurants,
  searchFoods,
} from "../controllers/shoppingController";

const router = Router();

router.get("/:pincode", getFoodAvailability);
router.get("/toprestaurant/:pincode", getTopRestaurants);
router.get("/foods-in-30-min/:pincode", getFoodsIn30Min);
router.get("/searchfoods/:pincode", searchFoods);

export { router as shoppingRoute };
