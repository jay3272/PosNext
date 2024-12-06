import React, { useState } from "react";
import styles from "../styles/Home.module.scss";
import MenuItem from "../components/MenuItem";
import Cart from "../components/Cart";

const menu = [
  { id: 1, name: "漢堡", price: 5.99, image: '/images/hamburger.jpg' },
  { id: 2, name: "鰻魚飯", price: 8.99, image: '/images/fish.jpg' },
  { id: 3, name: "豬排飯", price: 12.99, image: '/images/pork.jpg' },
];

const Home: React.FC = () => {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  return (
    <div className={styles.container}>
      <h1>Menu</h1>
      <ul>
        {menu.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            onAddToCart={() => addToCart(item)}
          />
        ))}
      </ul>
      <Cart items={cart} />
    </div>
  );
};

export default Home;
