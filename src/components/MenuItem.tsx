import React from "react";
import styles from "../components/MenuItem.module.scss";

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, price, image, onAddToCart }) => (
  <li className={styles.menuItem}>
    <img src={image} alt={name} />
    <div>
      <p>{name}</p>
      <p>${price.toFixed(2)}</p>
    </div>
    <button onClick={onAddToCart}>Add to Cart</button>
  </li>
);

export default MenuItem;
