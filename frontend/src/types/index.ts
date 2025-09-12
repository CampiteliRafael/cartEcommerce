export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}