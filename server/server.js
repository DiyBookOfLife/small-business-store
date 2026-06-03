import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

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

app.post("/api/contact", (req, res) => {
  console.log(req.body);

  res.json({
    message: "Contact form received!",
    data: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
