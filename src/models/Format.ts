import mongoose, { Schema, models } from "mongoose";

const FormatSchema = new Schema(
  {
    volume: { type: Number, required: true },
    description: { type: String },
    metadata: { type: Object }
  },
  { timestamps: true }
);

const Format = models.Format || mongoose.model("Format", FormatSchema);
export default Format;

