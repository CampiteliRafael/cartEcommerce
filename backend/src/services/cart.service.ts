import CartModel from "../models/Cart.model";
import { findProductByIdService } from "./ProductService";

export async function addItemToCartService(
  userId: string,
  productId: string,
  quantity: number
) {
  const product = await findProductByIdService(productId);

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  let cart = await CartModel.findOne({ user: userId });
  if (!cart) {
    cart = await CartModel.create({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity,
      price: product.price,
    });
  }

  await cart.save();
  return cart.populate({ path: "items.product", model: "Product" });
}

export async function findUserCartService(userId: string) {
  const cart = await CartModel.findOne({ user: userId })
    .populate({
      path: "items.product",
      model: "Product",
    })
    .lean();
  if (!cart) {
    return { user: userId, items: [] };
  }

  return cart;
}

export async function updateItemQuantityService(
  userId: string,
  productId: string,
  quantity: number
) {
  const cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    throw new Error("Carrinho não encontrado.");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    throw new Error("Item não encontrado no carrinho.");
  }

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();
  return cart.populate({ path: "items.product", model: "Product" });
}

export async function removeItemFromCartService(
  userId: string,
  productId: string
) {
  console.log(`Removing item ${productId} from cart for user ${userId}`);
  
  const cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    throw new Error("Carrinho não encontrado.");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    throw new Error("Item não encontrado no carrinho.");
  }

  cart.items.splice(itemIndex, 1);
  console.log(`Item removed, remaining items: ${cart.items.length}`);

  await cart.save();
  return cart.populate({ path: "items.product", model: "Product" });
}