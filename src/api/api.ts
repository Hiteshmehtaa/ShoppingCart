import { Product, Cart, Receipt } from '../types';

const API_BASE_URL = 'https://shoppingcart-1-j2l8.onrender.com/';

export const api = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getCart(): Promise<{ cart: Cart; total: number }> {
    const response = await fetch(`${API_BASE_URL}/cart`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  async removeFromCart(itemId: string): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
  },

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
  },

  async checkout(name: string, email: string, cartItems: any[]): Promise<Receipt> {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, cartItems })
    });
    if (!response.ok) throw new Error('Failed to checkout');
    return response.json();
  }
};
