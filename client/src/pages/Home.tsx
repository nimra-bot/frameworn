import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import EditorialMarquee from '../components/EditorialMarquee';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { fetchProducts } from '../api/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/Product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() =>
        setError(
          'Could not reach the backend. Is your server running on port 5000?'
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />

      <EditorialMarquee products={products} />

      {error && (
        <p
          style={{
            textAlign: 'center',
            color: '#9A9A9A',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 13,
            padding: '20px 0',
          }}
        >
          {error}
        </p>
      )}

      <ProductGrid
        products={products}
        loading={loading}
        onAddToCart={addToCart}
      />

      
      <Footer />
    </>
  );
}

