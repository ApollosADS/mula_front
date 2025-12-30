import mongoose, { Schema, models } from "mongoose";

// Sous-schema pour les items
const ItemSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema(
  {
    paymentId: { type: String },
    customer_email: { type: String },
    merchant_email: { type: String },
    items: { type: [ItemSchema], required: true },
    payment_method: {
      type: String,
      enum: ["card", "mobile"],
      required: true
    },
    status: {
      type: String,
      enum: ["ORDER_STATUS_PENDING", "ORDER_STATUS_COMPLETED", "ORDER_STATUS_CANCELED"],
      default: "ORDER_STATUS_PENDING",
      required: true
    },
    currency: { type: String, default: "XAF" },
    transaction_details: {
      type: Schema.Types.Mixed,
      default: {},
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model("Order", OrderSchema);
export default Order;

