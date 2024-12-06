import type { NextApiRequest, NextApiResponse } from 'next'; 
import { insertOrder, getOrders} from '../../db/database'; // 引入資料庫

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

    // 確保 totalAmount 是有效的數字
    const totalAmountParsed = parseFloat(totalAmount);
    if (isNaN(totalAmountParsed)) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    try {
      const order = req.body; // 獲取前端傳過來的訂單資料
      await insertOrder(order); // 調用資料庫插入函數
      res.status(200).json({ success: true, message: '訂單新增成功' });
    } catch (error: unknown) {
      // 檢查 error 是否為 Error 類型
      if (error instanceof Error) {
        console.error("Error inserting order:", error.message); // 記錄錯誤訊息
        res.status(500).json({ success: false, message: '訂單新增失敗', error: error.message });
      } else {
        // 如果錯誤不是 Error 類型
        console.error("Unexpected error:", error);
        res.status(500).json({ success: false, message: '訂單新增失敗', error: '未知錯誤' });
      }
  } 
  } 
  // 如果請求方法不對
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
