"use client";

import { Cart } from "@/types";
import { cartService } from "@/services/api";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { ERROR_MESSAGES } from "@/utils/constants";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authState } = useAuth();

  const fetchCart = async () => {
    if (!authState.isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const data = await cartService.getUserCart();
      setCart(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(ERROR_MESSAGES.CART.ADD_ITEM);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [authState.isAuthenticated]);

  const addToCart = async (productId: string, quantity: number) => {
    if (!authState.isAuthenticated) {
      setError(ERROR_MESSAGES.AUTH.REQUIRED);
      return;
    }

    setIsLoading(true);
    try {
      const updatedCart = await cartService.addItemToCart(productId, quantity);
      setCart(updatedCart);
      setError(null);
    } catch (err) {
      console.error("Error adding item to cart:", err);
      setError(ERROR_MESSAGES.CART.ADD_ITEM);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!authState.isAuthenticated) {
      setError(ERROR_MESSAGES.AUTH.REQUIRED);
      return;
    }

    setIsLoading(true);
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
      } else {
        const updatedCart = await cartService.updateItemQuantity(productId, quantity);
        setCart(updatedCart);
      }
      setError(null);
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(ERROR_MESSAGES.CART.UPDATE_ITEM);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!authState.isAuthenticated) {
      setError(ERROR_MESSAGES.AUTH.REQUIRED);
      return;
    }

    setIsLoading(true);
    try {
      const updatedCart = await cartService.updateItemQuantity(productId, 0);
      setCart(updatedCart);
      setError(null);
    } catch (err) {
      console.error("Error removing item from cart:", err);
      setError(ERROR_MESSAGES.CART.REMOVE_ITEM);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCart(null);
  };

  const totalItems = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  
  const totalPrice = cart?.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  ) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}