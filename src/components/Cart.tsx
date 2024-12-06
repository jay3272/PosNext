import React from "react";
import styles from "../components/Cart.module.scss";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ items }) => (
  <div className={styles.container}>
    <h2 className={styles.cartTitle}>Shopping Cart</h2> {/* 套用 cartTitle 樣式 */}
    <div>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.quantity}>x{item.quantity}</div>
            <div className={styles.price}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default Cart;
