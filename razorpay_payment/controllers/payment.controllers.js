const {
  createRazorpayOrder,
  verifyRazorpayPayment,
  generateRazorpayPaymentLink,
} = require("../helper/razorpayHelper");

const createOrder = async (req, res) => {
  const amount = req.validatedBody.amount;
  const currency = req.validatedBody.currency;

  try {
    const order = await createRazorpayOrder(amount, currency);
    return res.status(201).json(order);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Not able to create order. Please try again!");
  }
};

// NOTE: the payment link gets generated successfully, but in the test mode,
// the payment was failing when we try to make payment through that link
const generatePaymentLink = async (req, res) => {
  const amount = req.validatedBody.amount;
  const currency = req.validatedBody.currency;

  try {
    const paymentLink = await generateRazorpayPaymentLink(amount, currency);
    return res.status(201).json(paymentLink);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send("Not able to create payment link. Please try again!");
  }
};

// used for webhook endpoint
const verifyPayment = async (req, res) => {
  try {
    verifyRazorpayPayment(
      JSON.stringify(req.body),
      req.headers["x-razorpay-signature"]
    );
    return res.status(204).json();
  } catch (err) {
    console.log(err);
    return res.status(400).send("Not able to verify payment");
  }
};

module.exports = { createOrder, verifyPayment, generatePaymentLink };
