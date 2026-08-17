import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Product } from '../types/Product';
import { API_URL } from '../api/config';
import { useCart } from '../context/CartContext';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }

        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch(() => {
        setError('Could not load this product.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToBag = () => {
    if (!product) return;

    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className={styles.message}>
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.message}>
        <p>{error || 'Product not found.'}</p>

        <Link
          to="/"
          className={styles.backButton}
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">

        <Link
          to="/"
          className={styles.back}
        >
          ← Back to Shop
        </Link>

        <div className={styles.product}>

          {/* PRODUCT IMAGE */}
          <div className={styles.imageBox}>
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          {/* PRODUCT INFORMATION */}
          <div className={styles.info}>

            <span className={styles.category}>
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <div className={styles.rating}>
              ★ {product.rating.toFixed(1)}
            </div>

            <div className={styles.price}>
              Rs. {product.price.toLocaleString()}
            </div>

            <div className={styles.line} />

            <p className={styles.description}>
              {product.description ||
                'A carefully selected Frameworn piece designed with a clean, modern aesthetic.'}
            </p>

            {/* QUANTITY */}
            <div className={styles.quantitySection}>
              <span>Quantity</span>

              <div className={styles.quantity}>
                <button
                  type="button"
                  onClick={() =>
                    setQty((q) => Math.max(1, q - 1))
                  }
                >
                  −
                </button>

                <span>{qty}</span>

                <button
                  type="button"
                  onClick={() =>
                    setQty((q) => q + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* ADD TO BAG */}
            <button
              type="button"
              className={`${styles.addButton} ${
                added ? styles.added : ''
              }`}
              onClick={handleAddToBag}
            >
              {added
                ? 'Added to Bag ✓'
                : 'Add to Bag'}
            </button>

            {/* OPEN BAG */}
            {added && (
              <Link
                to="/"
                className={styles.bagButton}
              >
                Open Bag / Checkout
              </Link>
            )}

            {/* CONTINUE SHOPPING */}
            <Link
              to="/"
              className={styles.continue}
            >
              Continue Shopping
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}