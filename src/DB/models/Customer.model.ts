import { Schema, model, Types, Document } from "mongoose";

interface CustomerDoc extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  verified: boolean;
}

const customerSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { type: String, required: true },
    verified: { type: Boolean },
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
