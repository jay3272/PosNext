import { useState } from "react"

interface MenuItem {
    id: number;
    name: string;
    price: number;
    quantity?: number;
  }
  
  const menu: MenuItem[] = [
    { id: 1, name: "Burger", price: 50 },
    { id: 2, name: "Fries", price: 20 },
  ];
  
  const [cart, setCart] = useState<MenuItem[]>([]);
  
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((i) => i.id === item.id);
  
      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity =
          (updatedCart[existingItemIndex].quantity || 0) + 1;
        return updatedCart;
      }
  
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  
  const handleAddToCart = (id: number) => {
    const item = menu.find((product) => product.id === id);
    if (item) {
      addToCart(item);
    }
  };