import Database from 'better-sqlite3'; 
import path from 'path';
import fs from 'fs';

// 定義資料庫檔案的路徑
const dbDirectory = path.resolve(process.cwd(), 'db');
const dbPath = path.resolve(dbDirectory, 'order.db');

// 檢查並創建 db 目錄（如果不存在）
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// 初始化資料庫檔案
const db = new Database(dbPath);

// 檢查資料庫中是否已有表格
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables);

// 建立 `orders` 表格 (如果尚未存在)
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    totalAmount TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// 建立 `cart_items` 表格 (如果尚未存在)
db.exec(`
  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id)
  );
`);

export default db;
