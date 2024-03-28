import { instance } from "../utils/index.js";
import crypto from "crypto";
import * as dotenv from 'dotenv'

dotenv.config()

export const paymentController = async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  try {
    const data = await instance.orders.create(options)
    return res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(503).json({ message: "something went wrong" })
  }
}

export const verifyPaymentController = async (req, res) => {
  const body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const response = { "signatureIsValid": "false" }
  if (expectedSignature === req.body.response.razorpay_signature) {
    res.status(200).json({ message: "payment verified successfully" });

  } else {
    res.status(500).json({ message: "payment not-verified" });
  }
}


