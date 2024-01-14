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
    addedBy: { type: Types.ObjectId, ref: "Vendor" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    price: { type: Number },
    rating: { type: Number },
    images: [String],
    imagePublicIds: [String],
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

const foodModel = model<FoodDoc>("Food", foodSchema);
export { foodModel };
