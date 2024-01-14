import { Router } from "express";
import { customer } from "../controllers";

const router = Router();

router.get("/", customer);

export { router as customerRoute };
 