import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Outerwear.module.css';
import { fetchProducts } from '../api/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/Product';

export default function Outerwear() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const outerwear = useMemo(
    () => products.filter((p) => p.category === 'Outerwear'),
    [products]
  );

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <span className={styles.eyebrow}>The Outerwear Edit</span>

        <h1>Outerwear</h1>

        <p>
          Layer up with carefully selected jackets and coats designed
          for modern everyday style.
        </p>
      </section>

      {loading && (
        <p className={styles.message}>Loading outerwear...</p>
      )}

      {!loading && outerwear.length === 0 && (
        <p className={styles.message}>
          No outerwear products found.
        </p>
      )}

      <section className={styles.grid}>
        {outerwear.map((product) => (
          <div key={product._id} className={styles.card}>
            <Link
              to={`/product/${product._id}`}
              className={styles.imageLink}
            >
              <div className={styles.imageBox}>
                <span className={styles.category}>
                  {product.category}
                </span>

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