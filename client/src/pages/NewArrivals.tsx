import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewArrivals.module.css';
import { fetchProducts } from '../api/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/Product';

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCat, setActiveCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const newArrivals = useMemo(() => {
    return products.filter(
      (p) =>
        p.category === 'Bags' ||
        p.category === "Women's Fashion"
    );
  }, [products]);

  const filtered = useMemo(() => {
    if (activeCat === 'All') return newArrivals;

    return newArrivals.filter(
      (p) => p.category === activeCat
    );
  }, [newArrivals, activeCat]);

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <span className={styles.eyebrow}>Freshly Added</span>

        <h1>New Arrivals</h1>

        <p>
          Discover the latest pieces added to the Frameworn collection.
        </p>

        <div className={styles.filters}>
          {['All', 'Bags', "Women's Fashion"].map((category) => (
            <button
              key={category}
              className={`${styles.filter} ${
                activeCat === category ? styles.active : ''
              }`}
              onClick={() => setActiveCat(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {loading && (
        <p className={styles.message}>Loading new arrivals...</p>
      )}

      {!loading && filtered.length === 0 && (
        <p className={styles.message}>No new arrivals found.</p>
      )}

      <section className={styles.grid}>
        {filtered.map((product) => (
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