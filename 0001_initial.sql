-- Veritabanı şeması: SpendSmart uygulaması için
-- Migrations/0001_initial.sql

-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  daily_spending_limit REAL DEFAULT 1.0,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kategoriler tablosu
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  color TEXT NOT NULL
);

-- Ürünler tablosu
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- Mağazalar tablosu
CREATE TABLE IF NOT EXISTS stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

-- Harcamalar tablosu
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  store_id INTEGER,
  amount REAL NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (store_id) REFERENCES stores (id)
);

-- İndirimler tablosu
CREATE TABLE IF NOT EXISTS discounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  store_id INTEGER NOT NULL,
  discount_percentage REAL NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (store_id) REFERENCES stores (id)
);

-- Kaydedilen indirimler tablosu
CREATE TABLE IF NOT EXISTS saved_discounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  discount_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (discount_id) REFERENCES discounts (id),
  UNIQUE(user_id, discount_id)
);

-- Örnek veriler: Kategoriler
INSERT INTO categories (name, color) VALUES
  ('Meat', '#f87171'),
  ('Dairy', '#60a5fa'),
  ('Fruits & Vegetables', '#6ee7b7'),
  ('Bakery', '#fcd34d'),
  ('Breakfast', '#c4b5fd'),
  ('Others', '#a1a1aa');

-- Örnek veriler: Mağazalar
INSERT INTO stores (name) VALUES
  ('LIDL'),
  ('Carrefour'),
  ('Aldi'),
  ('Migros'),
  ('Tesco');

-- Örnek veriler: Ürünler
INSERT INTO products (name, category_id) VALUES
  ('Milk 1L', 2),
  ('Eggs (10-pack)', 5),
  ('Bread', 4),
  ('Butter 250g', 2),
  ('Chicken Breast', 1),
  ('Whole Wheat Bread', 4),
  ('Cheese Selection', 2),
  ('Organic Vegetables', 3),
  ('Wine Bottle', 6),
  ('Bread Assortment', 4),
  ('Meat Package', 1);

-- Örnek veriler: Kullanıcılar
INSERT INTO users (name, email, daily_spending_limit, notifications_enabled, language) VALUES
  ('Salih Tas', 'salihtas@example.com', 1.0, TRUE, 'en');

-- Örnek veriler: Harcamalar
INSERT INTO expenses (user_id, product_id, store_id, amount) VALUES
  (1, 11, 1, 45.30),
  (1, 7, 2, 32.50),
  (1, 8, 3, 28.75),
  (1, 9, 2, 24.99),
  (1, 10, 1, 18.45),
  (1, 1, 1, 1.99),
  (1, 2, 1, 3.49),
  (1, 3, 4, 1.29),
  (1, 4, 2, 2.99),
  (1, 5, 3, 5.99);

-- Örnek veriler: İndirimler
INSERT INTO discounts (product_id, store_id, discount_percentage, start_date, end_date) VALUES
  (1, 1, 20, datetime('now'), datetime('now', '+2 days')),
  (2, 1, 20, datetime('now', '+1 day'), datetime('now', '+4 days')),
  (4, 2, 15, datetime('now'), datetime('now', '+3 days')),
  (5, 3, 10, datetime('now'), datetime('now', '+1 days')),
  (6, 1, 25, datetime('now'), datetime('now', '+2 days'));
