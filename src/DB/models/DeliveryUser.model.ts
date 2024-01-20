import mongoose, { Schema, Document, Model } from "mongoose";

interface DeliveryUserDoc extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  pincode: string;
  confirmEmail: boolean;
  lat: number;
  lng: number;
  isAvailable: boolean;
}

const DeliveryUserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { type: String, required: true },
    pincode: { type: String },
    confirmEmail: { type: Boolean, default: false },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const deliveryUserModel = mongoose.model<DeliveryUserDoc>(
  "DeliveryUser",
  DeliveryUserSchema
);

export { deliveryUserModel };
