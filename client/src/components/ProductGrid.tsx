import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductGrid.module.css';
import type { Product } from '../types/Product';

interface Props {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({
  products,
  loading,
  onAddToCart,
}: Props) {
  const [activeCat, setActiveCat] = useState('All');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filtered =
    activeCat === 'All'
      ? products
      : products.filter((p) => p.category === activeCat);

  useEffect(() => {
    if (!addedId) return;

    const t = setTimeout(() => setAddedId(null), 900);

    return () => clearTimeout(t);
  }, [addedId]);

  return (
    <section className={styles.section} id="shop">
      <div className="container">

        <div className={styles.head}>
          <div>
            <span className="eyebrow">Full Collection</span>
            <h2 className={styles.title}>Shop</h2>
          </div>

          <div className={styles.filters}>
            {categories.map((c) => (
              <button
                key={c}
                className={`${styles.chip} ${
                  c === activeCat ? styles.active : ''
                }`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <p className={styles.empty}>
            Loading products...
          </p>
        )}

        {!loading && filtered.length === 0 && (
          <p className={styles.empty}>
            No products yet — run the seed script on your backend.
          </p>
        )}

        <div className={styles.grid}>
          {filtered.map((p) => (
            <div key={p._id} className={styles.card}>

              {/* Product image + information */}
              <Link
                to={`/product/${p._id}`}
                className={styles.productLink}
              >
                <div className={styles.imgWrap}>
                  <span className={styles.catTag}>
                    {p.category}
                  </span>

                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                  />
                </div>

                <div className={styles.body}>
                  <div className={styles.name}>
                    {p.name}
                  </div>

                  <div className={styles.rating}>
                    ★ {p.rating.toFixed(1)}
                  </div>

                  <div className={styles.price}>
                    Rs. {p.price.toLocaleString()}
                  </div>
                </div>
              </Link>

              {/* Add to bag */}
              <div className={styles.body}>
                <div className={styles.foot}>

                  <button
                    className={`${styles.addBtn} ${
                      addedId === p._id ? styles.added : ''
                    }`}
                    onClick={() => {
                      onAddToCart(p);
                      setAddedId(p._id);
                    }}
                  >
                    {addedId === p._id
                      ? 'Added ✓'
                      : 'Add to bag'}
                  </button>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}