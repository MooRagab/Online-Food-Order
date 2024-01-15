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
    firstName: { type: String , required: true },
    lastName: { type: String , required: true},
    address: { type: String },
    phone: { type: String, required: true, unique: true },
    confirmEmail: { type: Boolean, default: false },
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
