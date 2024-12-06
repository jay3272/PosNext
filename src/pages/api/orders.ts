import { NextApiRequest, NextApiResponse } from 'next';
import { getOrders } from '../../db/testdb'; // 引入 getOrders 方法

// 設定訂單資料型別
type Order = {
  id: number;
  totalAmount: string;
  items: string;  // 以逗號分隔的商品清單，例如 "漢堡 (x2), 鰻魚飯 (x1)"
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // 從資料庫中獲取訂單資料
      const orders = getOrders();

      // 檢查是否有訂單資料
      if (orders.length === 0) {
        res.status(404).json({ success: false, message: '沒有訂單資料' });
        return;
      }

      // 回傳訂單資料
      res.status(200).json(orders);
    } catch (error: unknown) {
      // 檢查 error 是否為 Error 類型
      if (error instanceof Error) {
        console.error("Error fetching orders:", error.message); // 記錄錯誤訊息
        res.status(500).json({ success: false, message: '無法取得訂單資料,Error 類型', error: error.message });
      } else {
        // 如果錯誤不是 Error 類型
        console.error("Unexpected error:", error);
        res.status(500).json({ success: false, message: '無法取得訂單資料,不是 Error 類型', error: '未知錯誤' });
      }
    }
  } else {
    // 只允許 GET 請求
    res.status(405).json({ message: '不支援的請求方法' });
  }
}
