import express from "express";
import { paymentController, verifyPaymentController } from "../controller/payment.js";



const router=express.Router();

router.post("/payment", paymentController)
router.post("/payment/verify", verifyPaymentController)



export default router;
