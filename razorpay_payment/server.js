const express = require("express");
require("dotenv").config({
  path: "./.env",
});
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const paymentRouter = require("./routes/payment.routes.js");
app.use("/api/v1", paymentRouter);

app.listen(PORT, () => {
  console.log("Server is Listening on Port ", PORT);
});
