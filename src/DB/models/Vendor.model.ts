import { Schema, model, Types } from "mongoose";

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean },
    coverImages: { type: [String] },
    rating: { type: Number },
    foods: [
      {
        type: Types.ObjectId,
        ref: "food",
      },
    ],
    lat: { type: Number },
    lng: { type: Number },
  },
  { timestamps: true }
);

const vendorModel = model("Vendor", vendorSchema);
export default vendorModel;
