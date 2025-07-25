import CartModel from '../models/Cart.model';
import { findProductByIdService } from './ProductService';

export async function addItemToCartService(userId: string, productId: string, quantity: number) {
  
  const product = await findProductByIdService(productId);
  
  if (!product) {
    throw new Error('Produto não encontrado.');
  }

  let cart = await CartModel.findOne({ user: userId });
  if (!cart) {
    cart = await CartModel.create({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ 
      product: product._id,
      quantity, 
      price: product.price 
    });
  }

  await cart.save();
  return cart.populate({ path: 'items.product', model: 'Product' });
}