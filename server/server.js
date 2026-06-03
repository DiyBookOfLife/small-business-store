import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Stripe from "stripe";

import ContactMessage from "./models/ContactMessage.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

// ** GET ROUTES ** //
app.get("/", (req, res) => {
  res.send("Backend is running");
});

//test route:
app.get("/api/test", (req, res) => {
  res.json({ message: "Frontend connected to backend!" });
});

//product route:
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get products",
      error: error.message,
    });
  }
});
const PORT = process.env.PORT || 2020;

// ** POST ROUTES ** //

// contact route:
app.post("/api/contact", async (req, res) => {
  try {
    const newMessage = await ContactMessage.create(req.body);

    res.status(201).json({
      message: "Contact message saved!",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

//checkout route:
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Stripe checkout failed",
    });
  }
});

// order route:
app.post("/api/orders", async (req, res) => {
  try {
    const { cart, sessionId } = req.body;

    const existingOrder = await Order.findOne({
      stripeSessionId: sessionId,
    });

    if (existingOrder) {
      return res.status(200).json({
        message: "Order already saved",
        data: existingOrder,
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const order = await Order.create({
      customerEmail: session.customer_details.email,
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: 1,
      })),
      total,
      stripeSessionId: sessionId,
      paymentStatus: session.payment_status,
    });

    res.status(201).json({
      message: "Order saved successfully!",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save order",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
