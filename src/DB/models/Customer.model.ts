import { Schema, model, Types, Document } from "mongoose";
import { OrderDoc } from "./Order.model";

interface CustomerDoc extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  confirmEmail: boolean;
  otp: number;
  otp_expires: number;
  lat: number;
  lng: number;
  orders: [OrderDoc];
}

const customerSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true, unique: true },
    confirmEmail: { type: Boolean, default: false },
    lat: { type: Number },
    lng: { type: Number },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const customerModel = model<CustomerDoc>("Customer", customerSchema);

export { customerModel };
