import { D1Database } from '@cloudflare/workers-types';

export interface Env {
  DB: D1Database;
}

// Veritabanı işlemleri için yardımcı fonksiyonlar
export class DatabaseService {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  // Kullanıcı işlemleri
  async getUser(id: number) {
    return this.db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
  }

  async getUserByEmail(email: string) {
    return this.db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
  }

  async updateUser(id: number, data: Record<string, unknown>) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    if (keys.length === 0) return null;
    
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const query = `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    
    return this.db.prepare(query).bind(...values, id).run();
  }

  // Kategori işlemleri
  async getAllCategories() {
    return this.db.prepare('SELECT * FROM categories').all();
  }

  // Ürün işlemleri
  async getTopConsumedProducts(userId: number, limit: number = 5) {
    return this.db.prepare(`
      SELECT p.id, p.name, COUNT(e.id) as count
      FROM expenses e
      JOIN products p ON e.product_id = p.id
      WHERE e.user_id = ?
      GROUP BY p.id, p.name
      ORDER BY count DESC
      LIMIT ?
    `).bind(userId, limit).all();
  }

  // Harcama işlemleri
  async getTotalSpending(userId: number) {
    return this.db.prepare(`
      SELECT SUM(amount) as total
      FROM expenses
      WHERE user_id = ?
    `).bind(userId).first();
  }

  async getSpendingByCategory(userId: number) {
    return this.db.prepare(`
      SELECT c.name as category, c.color, SUM(e.amount) as value
      FROM expenses e
      JOIN products p ON e.product_id = p.id
      JOIN categories c ON p.category_id = c.id
      WHERE e.user_id = ?
      GROUP BY c.name, c.color
      ORDER BY value DESC
    `).bind(userId).all();
  }

  async getTopSpendingProducts(userId: number, limit: number = 10) {
    return this.db.prepare(`
      SELECT p.name, SUM(e.amount) as amount
      FROM expenses e
      JOIN products p ON e.product_id = p.id
      WHERE e.user_id = ?
      GROUP BY p.name
      ORDER BY amount DESC
      LIMIT ?
    `).bind(userId, limit).all();
  }

  // İndirim işlemleri
  async getUpcomingDiscounts(limit: number = 5) {
    return this.db.prepare(`
      SELECT d.id, p.name, s.name as store, 
             d.discount_percentage || '% OFF' as discount,
             CASE 
               WHEN date(d.start_date) > date('now') THEN 'Starts ' || 
                 CASE 
                   WHEN date(d.start_date) = date('now', '+1 day') THEN 'tomorrow'
                   ELSE 'in ' || (julianday(d.start_date) - julianday('now')) || ' days'
                 END
               ELSE 'Expires in ' || (julianday(d.end_date) - julianday('now')) || ' days'
             END as expiryInfo
      FROM discounts d
      JOIN products p ON d.product_id = p.id
      JOIN stores s ON d.store_id = s.id
      WHERE date(d.end_date) >= date('now')
      ORDER BY 
        CASE WHEN date(d.start_date) > date('now') THEN 0 ELSE 1 END,
        d.end_date
      LIMIT ?
    `).bind(limit).all();
  }

  async getAllOffers() {
    return this.db.prepare(`
      SELECT d.id, p.name, s.name as store, 
             d.discount_percentage || '% OFF' as discount,
             CASE 
               WHEN date(d.start_date) > date('now') THEN 'Starts ' || 
                 CASE 
                   WHEN date(d.start_date) = date('now', '+1 day') THEN 'tomorrow'
                   ELSE 'in ' || (julianday(d.start_date) - julianday('now')) || ' days'
                 END
               ELSE 'Expires in ' || (julianday(d.end_date) - julianday('now')) || ' days'
             END as expiryInfo,
             c.name as category
      FROM discounts d
      JOIN products p ON d.product_id = p.id
      JOIN stores s ON d.store_id = s.id
      JOIN categories c ON p.category_id = c.id
      WHERE date(d.end_date) >= date('now')
      ORDER BY d.end_date
    `).all();
  }

  async saveDiscount(userId: number, discountId: number) {
    try {
      return this.db.prepare(`
        INSERT INTO saved_discounts (user_id, discount_id)
        VALUES (?, ?)
      `).bind(userId, discountId).run();
    } catch (error) {
      // Muhtemelen zaten kaydedilmiş
      return { success: false, error };
    }
  }

  // Fiş ve barkod tarama işlemleri
  async addExpenseFromReceipt(userId: number, productName: string, storeId: number, amount: number) {
    // Önce ürünü kontrol et, yoksa ekle
    let product = await this.db.prepare('SELECT id FROM products WHERE name = ?').bind(productName).first();
    
    if (!product) {
      // Ürün yoksa ekle (varsayılan kategori: Others)
      const result = await this.db.prepare(`
        INSERT INTO products (name, category_id)
        VALUES (?, (SELECT id FROM categories WHERE name = 'Others'))
      `).bind(productName).run();
      
      product = { id: result.meta.last_row_id };
    }
    
    // Harcama ekle
    return this.db.prepare(`
      INSERT INTO expenses (user_id, product_id, store_id, amount)
      VALUES (?, ?, ?, ?)
    `).bind(userId, product.id, storeId, amount).run();
  }
}

export default DatabaseService;
