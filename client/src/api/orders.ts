import { API_URL } from './config';
import type { Product } from '../types/Product';

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  phone: string;
}
export interface CartLine { product: Product; qty: number }

export async function placeOrder(token: string, cart: CartLine[], shippingAddress: ShippingAddress) {
  const items = cart.map((l) => ({
    product: l.product._id,
    name: l.product.name,
    price: l.product.price,
    qty: l.qty,
    image: l.product.image,
  }));
  const total = cart.reduce((s, l) => s + l.product.price * l.qty, 0);

  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items, total, shippingAddress }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to place order');
  return data;
}
