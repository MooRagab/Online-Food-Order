import { Schema, model, Types, Document } from "mongoose";
import { CreateFoodInput } from "../../dto/food.dto";
export interface FoodDoc extends Document {
  vendorId: string;
  name: string;
  description: string;
  category: string;
  foodType: string;
  readyTime: number;
  price: number;
  rating: number;
  images: [string];
}

const foodSchema = new Schema(
  {
    vendorId: { type: Types.ObjectId, ref: "Vendor", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    price: { type: Number },
    rating: { type: Number },
    images: { type: [String] },
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

const foodModel = model<CreateFoodInput>("Food", foodSchema);
export default foodModel;
