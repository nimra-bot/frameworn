import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Orders.module.css';
import { API_URL } from '../api/config';
import { useAuth } from '../context/AuthContext';

interface OrderItem {
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    phone: string;
  };
  status: string;
  createdAt: string;
}

export default function Orders() {
  const { token, user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/orders/mine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to load orders');
        }

        return data;
      })
      .then(setOrders)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (!user) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>
          <h1>Login Required</h1>
          <p>Please log in to view your order history.</p>

          <Link to="/login" className={styles.button}>
            Log in
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.message}>
          Loading your orders...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.message}>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">

        <Link to="/" className={styles.back}>
          ← Back to Shop
        </Link>

        <div className={styles.heading}>
          <span>ACCOUNT</span>
          <h1>Order History</h1>
          <p>
            {orders.length === 0
              ? 'You have not placed any orders yet.'
              : `${orders.length} order${orders.length > 1 ? 's' : ''}`}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className={styles.empty}>
            <h2>No orders yet</h2>
            <p>
              Your completed orders will appear here.
            </p>

            <Link to="/" className={styles.button}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.orders}>
            {orders.map((order) => (
              <div className={styles.order} key={order._id}>

                <div className={styles.orderTop}>
                  <div>
                    <span className={styles.orderLabel}>
                      ORDER
                    </span>

                    <h2>
                      #{order._id.slice(-8).toUpperCase()}
                    </h2>
                  </div>

                  <div className={styles.orderInfo}>
                    <span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>

                    <strong className={styles.status}>
                      {order.status}
                    </strong>
                  </div>
                </div>

                <div className={styles.items}>
                  {order.items.map((item, index) => (
                    <div
                      className={styles.item}
                      key={`${order._id}-${index}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className={styles.itemInfo}>
                        <h3>{item.name}</h3>

                        <p>
                          Qty: {item.qty}
                        </p>
                      </div>

                      <strong>
                        ${(
                          item.price * item.qty
                        ).toFixed(2)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className={styles.bottom}>

                  <div>
                    <span>Deliver to</span>
                    <p>
                      {order.shippingAddress.fullName},{' '}
                      {order.shippingAddress.city}
                    </p>
                  </div>

                  <div className={styles.total}>
                    <span>Total</span>
                    <strong>
                      ${order.total.toFixed(2)}
                    </strong>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}