import type { Product } from '../types/Product';
import { API_URL } from './config';

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category && category !== 'All'
    ? `${API_URL}/products?category=${encodeURIComponent(category)}`
    : `${API_URL}/products`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
