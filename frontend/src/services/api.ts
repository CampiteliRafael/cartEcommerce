import { Cart, Product, User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Verificar se estamos no navegador antes de acessar localStorage
  const isBrowser = typeof window !== 'undefined';
  const token = isBrowser ? localStorage.getItem('token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Fetch error for ${API_URL}${url}:`, error);
    throw error;
  }
}

export const authService = {
  async register(name: string, email: string, password: string) {
    const response = await fetchWithAuth('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    return response;
  },

  async login(email: string, password: string) {
    const response = await fetchWithAuth('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token && typeof window !== 'undefined') {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  },

  async getCurrentUser(): Promise<User> {
    return fetchWithAuth('/users/me');
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
};

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    return fetchWithAuth('/products');
  },

  async getProductById(id: string): Promise<Product> {
    return fetchWithAuth(`/products/${id}`);
  }
};

export const cartService = {
  async getUserCart(): Promise<Cart> {
    return fetchWithAuth('/cart');
  },

  async addItemToCart(productId: string, quantity: number): Promise<Cart> {
    return fetchWithAuth('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  async updateItemQuantity(productId: string, quantity: number): Promise<Cart> {
    return fetchWithAuth(`/cart/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }
};