import { instance } from "../utils/index.js";
import crypto from "crypto";
import * as dotenv from 'dotenv'

dotenv.config()
// import { Payment } from "../models/paymentModel.js";

// export const checkout = async (req, res) => {
//   const options = {
//     amount: Number(req.body.amount * 100),
//     currency: "INR",
//   };
//   const order = await instance.orders.create(options);

//   res.status(200).json({
//     success: true,
//     order,
//   });
// };

// export const paymentVerification = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     // Database comes here

//     // await Payment.create({
//     //   razorpay_order_id,
//     //   razorpay_payment_id,
//     //   razorpay_signature,
//     // });

//     res.redirect(
//       `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//     );
//   } else {
//     res.status(400).json({
//       success: false,
//     });
//   }
// };






export const paymentController = async (req, res) => {
  const options = {
    amount: req.body.amount * 100 || 5000,
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

export const verifyPaymentController = async(req, res) => {
  const body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const response = { "signatureIsValid": "false" }
  if (expectedSignature === req.body.response.razorpay_signature) {
    res.send({ code: 200, message: "payment verified" });

  } else {
    res.send({ code: 500, message: "payment not-verified" });
  }

}


