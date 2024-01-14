import { Router } from "express";
import { customerSignUp } from "../controllers";

const router = Router();

/* ------------------- Suignup / Create Customer --------------------- */
router.post("/signup" , customerSignUp)

/* ------------------- Login --------------------- */


export { router as customerRoute };
 