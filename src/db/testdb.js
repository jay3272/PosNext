import Database from 'better-sqlite3';

let db;

try {
  db = new Database('./test.db', { verbose: console.log });
} catch (error) {
  console.error("Database connection error:", error); // 記錄資料庫連接錯誤
}

// 插入測試訂單到資料庫
export function insertTestOrder(order) {
  const { cart, totalAmount } = order;

  // 插入訂單總金額
  const stmt = db.prepare('INSERT INTO orders (totalAmount) VALUES (?)');
  const result = stmt.run(totalAmount);

  // 插入每一項商品
  cart.forEach((item) => {
    const itemStmt = db.prepare('INSERT INTO order_items (orderId, itemName, price, quantity) VALUES (?, ?, ?, ?)');
    itemStmt.run(result.lastInsertRowid, item.name, item.price, item.quantity);
  });
}

// 查詢所有訂單
export function getOrders() {
  // 查詢 orders 表中的所有訂單資料
  const stmt = db.prepare(`
    SELECT orders.id, orders.totalAmount, 
           GROUP_CONCAT(order_items.itemName || ' (x' || CAST(order_items.quantity AS TEXT) || ')', ', ') AS items
    FROM orders
    LEFT JOIN order_items ON orders.id = order_items.orderId
    GROUP BY orders.id
  `);

  return stmt.all();
  console.log("Fetched orders:", orders); // 查看獲取的訂單資料
}
