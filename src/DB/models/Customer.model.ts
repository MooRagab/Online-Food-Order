import { Schema, model, Types, Document } from "mongoose";

interface CustomerDoc extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  verified: boolean;
  otp: number;
  otp_expires: number;
  lat: number;
  lng: number;
}

const customerSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    otp: {type: Number},
    otp_expiry: {type: Date},
    lat: {type: Number},
    lng: {type: Number},
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const customerModel = model<CustomerDoc>("Customer", customerSchema);

export { customerModel };
