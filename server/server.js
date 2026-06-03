import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import ContactMessage from "./models/ContactMessage.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Test API route:
app.get("/api/test", (req, res) => {
  res.json({ message: "Frontend connected to backend!" });
});

const PORT = process.env.PORT || 2020;

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
