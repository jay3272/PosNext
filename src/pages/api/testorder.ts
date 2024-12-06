// pages/api/testorder.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { insertTestOrder } from '../../db/testdb'; // 引入資料庫插入函數

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const order = req.body; // 獲取前端傳過來的訂單資料
      await insertTestOrder(order); // 調用資料庫插入函數
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
  } else {
    res.status(405).json({ message: '不支援的請求方法' });
  }
}
