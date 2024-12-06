import type { NextApiRequest, NextApiResponse } from 'next'; 
import db from '../../db/database'; // 引入資料庫

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutRequest = {
  cart: CartItem[];
  totalAmount: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 處理 POST 請求
  if (req.method === 'POST') {
    const { cart, totalAmount }: CheckoutRequest = req.body;

    // 測試：回應前端傳入的資料（確認收到）
    console.log('Received cart:', cart);
    console.log('Received totalAmount:', totalAmount);

    // 簡單回應測試訊息
    return res.status(200).json({
      message: 'API received data successfully!',
      receivedCart: cart,
      receivedTotalAmount: totalAmount,
    });
  } 
  
  // 處理其他請求方法
  else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
