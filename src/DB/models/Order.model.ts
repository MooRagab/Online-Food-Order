import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderDoc extends Document {
  orderId: string;
  vendorId: string;
  items: [any];
  totalAmount: number;
  paidAmount: number;
  orderDate: Date;
  orderStatus: string;
  paidThrough: String;
  remarks: string;
  deliveryId: string;
  offerId: String;
  appliedOffers: Boolean;
  readyTime: number;
}

const OrderSchema = new Schema(
  {
    orderId: { type: String, require: true },
    vendorId: { type: String, require: true },
    items: [
      {
        food: { type: Schema.Types.ObjectId, ref: "Food", require: true },
        unit: { type: Number, require: true },
      },
    ],
    totalAmount: { type: Number, require: true },
    paidAmount: { type: Number, require: true },
    orderDate: { type: Date, default: Date.now() },
    orderStatus: { type: String, default: "Waitng" },
    paidThrough: { type: String, default: "COD" },
    remarks: { type: String },
    deliveryId: { type: String },
    readyTime: { type: Number, default: 45 },
    offerId: { type: String, default: null },
    appliedOffers: { type: Boolean, default: false },
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

const orderModel = mongoose.model<OrderDoc>("Order", OrderSchema);

export { orderModel };
