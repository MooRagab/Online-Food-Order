import { Schema, model, Types, Document } from "mongoose";
interface VendorDoc extends Document {
  name: string;
  ownerName: string;
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  serviceAvailable: boolean;
  coverImages: [string];
  foodType: [string];
  confirmEmail: { type: Boolean; default: false };
  rating: number;
  foods: any;
  lat: number;
  lng: number;
}

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    serviceAvailable: { type: Boolean, default: false },
    confirmEmail: { type: Boolean, default: false },
    profilePic: { type: String },
    rating: { type: Number, default: 0 },
    foods: [
      {
        type: Types.ObjectId,
        ref: "Food",
      },
    ],
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const vendorModel = model<VendorDoc>("Vendor", vendorSchema);
export { vendorModel };
