import mongoose, { Schema, Document, Types } from "mongoose";

export interface ProductDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "O preço não pode ser negativo"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "O estoque não pode ser negativo"],
      default: 0,
    },
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
