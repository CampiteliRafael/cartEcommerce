import { Cart, Product, User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

function setCookie(name: string, value: string, days: number = 7) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(
        errorData.message || 
        `Error: ${response.status} ${response.statusText}`
      );
    } catch (e) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  }
  
  return response.json();
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const isBrowser = typeof window !== 'undefined';
  const token = isBrowser ? localStorage.getItem('token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    console.log(`Fetching ${API_URL}${url} with method ${options.method || 'GET'}`);
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    return handleResponse(response);
  } catch (error) {
    console.error(`Fetch error for ${API_URL}${url}:`, error);
    throw error;
  }
}

export const authService = {
  async register(name: string, email: string, password: string) {
    return fetchWithAuth('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  async login(email: string, password: string) {
    const response = await fetchWithAuth('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    const token = response.accessToken || response.token;
    
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      setCookie('token', token, 7);
    }
    
    return {
      ...response,
      token: token
    };
  },

  async getCurrentUser(): Promise<User> {
    return fetchWithAuth('/users/me');
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
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
    console.log(`Updating item ${productId} quantity to ${quantity}`);
    return fetchWithAuth(`/cart/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },
  
  async removeItem(productId: string): Promise<Cart> {
    console.log(`Removing item ${productId} from cart`);
    return fetchWithAuth(`/cart/items/${productId}`, {
      method: 'DELETE',
    });
  }
};