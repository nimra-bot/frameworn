import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartDrawer.module.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../api/orders';

interface Props {
  open: boolean;
  onClose: () => void;
}

type View = 'cart' | 'checkout' | 'confirm';

export default function CartDrawer({
  open,
  onClose,
}: Props) {
  const {
    cart,
    updateQty,
    removeFromCart,
    total,
    clearCart,
  } = useCart();

  const { user, token } = useAuth();

  const [view, setView] =
    useState<View>('cart');

  const [placing, setPlacing] =
    useState(false);

  const [errorMsg, setErrorMsg] =
    useState('');

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
  });

  const handleField =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({
        ...f,
        [key]: e.target.value,
      }));
    };

  const handlePlaceOrder = async () => {
    if (!token) return;

    if (
      !form.fullName ||
      !form.address ||
      !form.city ||
      !form.phone
    ) {
      setErrorMsg(
        'Please fill in all fields'
      );
      return;
    }

    setPlacing(true);
    setErrorMsg('');

    try {
      await placeOrder(
        token,
        cart,
        form
      );

      clearCart();
      setView('confirm');
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong'
      );
    } finally {
      setPlacing(false);
    }
  };

  const handleClose = () => {
    onClose();

    setTimeout(() => {
      setView('cart');
    }, 300);
  };

  return (
    <>
      {/* BACKGROUND */}
      <div
        className={`${styles.scrim} ${
          open ? styles.show : ''
        }`}
        onClick={handleClose}
      />

      {/* DRAWER */}
      <aside
        className={`${styles.drawer} ${
          open ? styles.open : ''
        }`}
      >

        {/* HEADER */}
        <div className={styles.head}>
          <h3>
            {view === 'checkout'
              ? 'Checkout'
              : view === 'confirm'
              ? 'Order Placed'
              : 'Your Bag'}
          </h3>

          <button
            className={styles.closeBtn}
            onClick={handleClose}
          >
            &times;
          </button>
        </div>

        {/* CONFIRMATION */}
        {view === 'confirm' && (
          <div className={styles.confirm}>

            <div
              className={styles.confirmCheck}
            >
              ✓
            </div>

            <h3>
              Thank you
              {user
                ? `, ${
                    user.name.split(' ')[0]
                  }`
                : ''}
            </h3>

            <p>
              Your order has been placed
              and saved to your account.
            </p>

            <button
              className="btn-outline"
              onClick={handleClose}
            >
              Continue shopping
            </button>

          </div>
        )}

        {/* LOGIN PROMPT */}
        {view !== 'confirm' && !user && (
          <div
            className={styles.loginPrompt}
          >
            <p>
              You'll need an account to
              check out.
            </p>

            <Link
              to="/login"
              className="btn-solid"
              onClick={handleClose}
            >
              Log in
            </Link>

            <Link
              to="/signup"
              onClick={handleClose}
              style={{
                fontSize: 12.5,
                color: 'var(--grey)',
                textDecoration:
                  'underline',
              }}
            >
              Create an account
            </Link>
          </div>
        )}

        {/* CHECKOUT */}
        {view === 'checkout' && user && (
          <>
            <div className={styles.body}>

              <button
                className={styles.backLink}
                onClick={() =>
                  setView('cart')
                }
              >
                ← Back to bag
              </button>

              {/* ORDER ITEMS */}
              <div
                className={
                  styles.checkoutItems
                }
              >
                {cart.map((line) => (
                  <div
                    key={`${line.product._id}-${line.color}`}
                    className={
                      styles.checkoutItem
                    }
                  >
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                    />

                    <div>
                      <strong>
                        {line.product.name}
                      </strong>

                      <span>
                        Color: {line.color}
                      </span>

                      <span>
                        Qty: {line.qty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* FORM */}
              <div
                className={styles.field}
              >
                <label>
                  Full name
                </label>

                <input
                  value={form.fullName}
                  onChange={handleField(
                    'fullName'
                  )}
                  placeholder="Your name"
                />
              </div>

              <div
                className={styles.field}
              >
                <label>
                  Address
                </label>

                <input
                  value={form.address}
                  onChange={handleField(
                    'address'
                  )}
                  placeholder="Street, area"
                />
              </div>

              <div
                className={styles.field}
              >
                <label>
                  City
                </label>

                <input
                  value={form.city}
                  onChange={handleField(
                    'city'
                  )}
                  placeholder="City"
                />
              </div>

              <div
                className={styles.field}
              >
                <label>
                  Phone
                </label>

                <input
                  value={form.phone}
                  onChange={handleField(
                    'phone'
                  )}
                  placeholder="Phone number"
                />
              </div>

              {errorMsg && (
                <p
                  style={{
                    color: '#E86A5C',
                    fontSize: 12.5,
                  }}
                >
                  {errorMsg}
                </p>
              )}
            </div>

            <div className={styles.foot}>

              <div
                className={`${styles.sumRow} ${styles.total}`}
              >
                <span>Total</span>

                <span>
                  Rs.{' '}
                  {total.toLocaleString()}
                </span>
              </div>

              <button
                className={
                  styles.checkoutBtn
                }
                onClick={
                  handlePlaceOrder
                }
                disabled={placing}
              >
                {placing
                  ? 'Placing order…'
                  : 'Place order'}
              </button>

            </div>
          </>
        )}

        {/* CART */}
        {view === 'cart' && (
          <>
            <div className={styles.body}>

              {cart.length === 0 && (
                <div
                  className={styles.empty}
                >
                  <p>
                    Your bag is empty.
                    <br />
                    Explore the collection
                    to find something.
                  </p>
                </div>
              )}

              {cart.map((line) => (
                <div
                  className={styles.line}
                  key={`${line.product._id}-${line.color}`}
                >

                  <img
                    src={line.product.image}
                    alt={line.product.name}
                  />

                  <div
                    className={
                      styles.lineInfo
                    }
                  >

                    <div
                      className={
                        styles.lineName
                      }
                    >
                      {line.product.name}
                    </div>

                    <div
                      className={
                        styles.lineCat
                      }
                    >
                      {line.product.category}
                    </div>

                    {/* COLOR */}
                    <div
                      className={
                        styles.lineColor
                      }
                    >
                      Color:{' '}
                      <strong>
                        {line.color}
                      </strong>
                    </div>

                    {/* QUANTITY + PRICE */}
                    <div
                      className={
                        styles.lineFoot
                      }
                    >

                      <div
                        className={styles.qty}
                      >
                        <button
                          onClick={() =>
                            updateQty(
                              line.product._id,
                              line.qty - 1,
                              line.color
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {line.qty}
                        </span>

                        <button
                          onClick={() =>
                            updateQty(
                              line.product._id,
                              line.qty + 1,
                              line.color
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <span
                        className={
                          styles.price
                        }
                      >
                        Rs.{' '}
                        {(
                          line.product.price *
                          line.qty
                        ).toLocaleString()}
                      </span>

                    </div>

                    {/* REMOVE */}
                    <button
                      className={
                        styles.remove
                      }
                      onClick={() =>
                        removeFromCart(
                          line.product._id,
                          line.color
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* CART FOOTER */}
            {cart.length > 0 && (
              <div
                className={styles.foot}
              >

                <div
                  className={
                    styles.sumRow
                  }
                >
                  <span>
                    Subtotal
                  </span>

                  <span>
                    Rs.{' '}
                    {total.toLocaleString()}
                  </span>
                </div>

                <div
                  className={
                    styles.sumRow
                  }
                >
                  <span>
                    Shipping
                  </span>

                  <span>
                    Free
                  </span>
                </div>

                <div
                  className={`${styles.sumRow} ${styles.total}`}
                >
                  <span>Total</span>

                  <span>
                    Rs.{' '}
                    {total.toLocaleString()}
                  </span>
                </div>

                <button
                  className={
                    styles.checkoutBtn
                  }
                  onClick={() =>
                    setView('checkout')
                  }
                >
                  Checkout
                </button>

              </div>
            )}
          </>
        )}

      </aside>
    </>
  );
}