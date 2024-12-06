import React, { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';
import Cart from '../components/Cart';

const menu = [
  { id: 1, name: '漢堡', price: 180, image: '/images/hamburger.jpg' },
  { id: 2, name: '鰻魚飯', price: 200, image: '/images/fish.jpg' },
  { id: 3, name: '豬排飯', price: 220, image: '/images/pork.jpg' },
];

const Home: React.FC = () => {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false); // 用來控制是否顯示結帳完成訊息

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

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

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, totalAmount }),
      });

      if (response.ok) {
        setCheckoutSuccess(true); // 設定成功狀態
        setCart([]); // 清空購物車
        alert(`已送出訂單`);
      } else {
        const errorData = await response.json();
        alert(`Checkout failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An unexpected error occurred during checkout.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <h1>Menu</h1>
      {!checkoutSuccess ? (
        <>
          <ul>
            {menu.map((item) => (
              <MenuItem key={item.id} {...item} onAddToCart={() => addToCart(item)} />
            ))}
          </ul>
          <Cart items={cart} />
          <div>
            <h3>總共金額: ${totalAmount}</h3>
            <button onClick={handleCheckout} disabled={cart.length === 0 || isLoading}>
              {isLoading ? '處理中...' : '送出'}
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2>感謝您的訂單！</h2>
          <p>您的訂單已成功送出，請稍候我們處理。</p>
        </div>
      )}
    </div>
  );
};

export default Home;
