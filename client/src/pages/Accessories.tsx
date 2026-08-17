import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Accessories.module.css';
import { fetchProducts } from '../api/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/Product';

export default function Accessories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.filter((p) => p.category === 'Accessories'));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <span className={styles.eyebrow}>The Accessories Edit</span>

        <h1>Accessories</h1>

        <p>
          Small details, distinctive style. Explore our curated
          collection of accessories.
        </p>
      </section>

      {loading && (
        <p className={styles.message}>Loading accessories...</p>
      )}

      {!loading && products.length === 0 && (
        <p className={styles.message}>
          No accessories found.
        </p>
      )}

      <section className={styles.grid}>
        {products.map((product) => (
          <div key={product._id} className={styles.card}>
            <Link
              to={`/product/${product._id}`}
              className={styles.imageLink}
            >
              <div className={styles.imageBox}>
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>
            </Link>

            <div className={styles.info}>
              <div>
                <Link
                  to={`/product/${product._id}`}
                  className={styles.name}
                >
                  {product.name}
                </Link>

                <div className={styles.rating}>
                  ★ {product.rating.toFixed(1)}
                </div>

                <div className={styles.price}>
                  Rs. {product.price.toLocaleString()}
                </div>
              </div>

              <button
                className={styles.addButton}
                onClick={() => addToCart(product)}
              >
                Add to bag
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}