const express = require("express");
const router = express.Router();
const {
  validateCreateOrder,
  validateGeneratePaymentLink,
} = require("../middlewares/payment.middlewares");
const {
  createOrder,
  verifyPayment,
  generatePaymentLink,
} = require("../controllers/payment.controllers");

router.post("/create-order", validateCreateOrder, createOrder);

router.post(
  "/generate-payment-link",
  validateGeneratePaymentLink,
  generatePaymentLink
);

router.post("/verify-payment", verifyPayment);

module.exports = router;
