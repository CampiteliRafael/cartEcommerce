import mongoose, { Schema, Document } from 'mongoose';

interface CartItem {
  product: mongoose.Types.ObjectId; 
  quantity: number;
  price: number;
}

export interface CartDocument extends Document {
  user: mongoose.Types.ObjectId; 
  items: CartItem[];
  __v: 0;
}

const cartItemSchema = new Schema<CartItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true },
}, { _id: false }); 

const cartSchema = new Schema<CartDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model<CartDocument>('Cart', cartSchema);

export default CartModel;