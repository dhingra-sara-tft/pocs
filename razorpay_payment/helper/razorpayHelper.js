const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

const currencyToAmountMultiplierMapping = {
  INR: 100,
};

const createRazorpayOrder = async (amount, currency) => {
  const paymentOptions = {
    amount: amount * currencyToAmountMultiplierMapping[currency],
    currency,
  };

  return await razorpayInstance.orders.create(paymentOptions);
};

const generateRazorpayPaymentLink = async (amount, currency) => {
  const paymentLinkOptions = {
    amount: amount * currencyToAmountMultiplierMapping[currency],
    currency,
  };

  return await razorpayInstance.paymentLink.create(paymentLinkOptions);
};

const verifyRazorpayPayment = (data, razorpaySignature) => {
  const secret = process.env.SECRET;

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(data);
  const digest = shasum.digest("hex");

  if (digest === razorpaySignature) {
    const dataFromRazorpay = JSON.parse(data);

    // handle the cases as per the need
    switch (dataFromRazorpay.event) {
      case "payment.captured":
        console.log("Request is legit");
        break;
    }
  } else {
    throw new Error("Payment Verification failed");
  }
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment,
  generateRazorpayPaymentLink,
};
