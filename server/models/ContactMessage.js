import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const ContactMessage = mongoose.model(
  "ContactMessage",
  contactMessageSchema
);

export default ContactMessage;