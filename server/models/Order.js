import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerEmail: String,
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentStatus: String,
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
