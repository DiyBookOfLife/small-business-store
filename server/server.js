import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import ContactMessage from "./models/ContactMessage.js";
import Product from "./models/Product.js";

dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
