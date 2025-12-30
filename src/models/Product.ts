import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    format: { type: mongoose.Schema.Types.ObjectId, ref: "Format" },
    image: { type: String },
    metadata: { type: Object }
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", ProductSchema);
export default Product;

