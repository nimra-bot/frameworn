import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import type { Product } from '../types/Product';

export interface CartLine {
  product: Product;
  qty: number;
  color: string;
}

interface CartContextType {
  cart: CartLine[];

  addToCart: (
    product: Product,
    color?: string
  ) => void;

  updateQty: (
    productId: string,
    qty: number,
    color?: string
  ) => void;

  removeFromCart: (
    productId: string,
    color?: string
  ) => void;

  clearCart: () => void;

  total: number;
  count: number;
}

const CartContext =
  createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      const saved = localStorage.getItem('frameworn_cart');

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return [];
      }

      // Purane cart items ke liye default color
      return parsed.map((item: CartLine) => ({
        ...item,
        color: item.color || 'Black',
      }));
    } catch {
      return [];
    }
  });

  // Cart ko localStorage mein save karna
  useEffect(() => {
    localStorage.setItem(
      'frameworn_cart',
      JSON.stringify(cart)
    );
  }, [cart]);

  // Add product with selected color
  const addToCart = (
    product: Product,
    color = 'Black'
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (line) =>
          line.product._id === product._id &&
          line.color === color
      );

      // Same product + same color
      if (existing) {
        return prev.map((line) =>
          line.product._id === product._id &&
          line.color === color
            ? {
                ...line,
                qty: line.qty + 1,
              }
            : line
        );
      }

      // Same product but different color
      return [
        ...prev,
        {
          product,
          qty: 1,
          color,
        },
      ];
    });
  };

  // Quantity update
  const updateQty = (
    productId: string,
    qty: number,
    color = 'Black'
  ) => {
    setCart((prev) =>
      prev.map((line) =>
        line.product._id === productId &&
        line.color === color
          ? {
              ...line,
              qty: Math.max(1, qty),
            }
          : line
      )
    );
  };

  // Remove product + selected color
  const removeFromCart = (
    productId: string,
    color = 'Black'
  ) => {
    setCart((prev) =>
      prev.filter(
        (line) =>
          !(
            line.product._id === productId &&
            line.color === color
          )
      )
    );
  };

  // Clear complete cart
  const clearCart = () => {
    setCart([]);
  };

  // Total price
  const total = cart.reduce(
    (sum, line) =>
      sum + line.product.price * line.qty,
    0
  );

  // Total items
  const count = cart.reduce(
    (sum, line) => sum + line.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      'useCart must be used within CartProvider'
    );
  }

  return ctx;
}