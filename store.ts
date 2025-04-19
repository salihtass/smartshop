import { create } from 'zustand';
import DatabaseService from './database';

// Ürün tipi tanımı
interface Product {
  id: string;
  name: string;
  store?: string;
  discount?: string;
  expiryInfo?: string;
  count?: number;
  price?: number;
  category?: string;
}

// Kullanıcı tipi tanımı
interface User {
  id: number;
  name: string;
  email: string;
  dailySpendingLimit: number;
  notificationsEnabled: boolean;
  language: 'en' | 'de';
}

// Uygulama durumu tipi tanımı
interface AppState {
  // Veritabanı servisi
  dbService: DatabaseService | null;
  setDbService: (service: DatabaseService) => void;
  
  // Kullanıcı bilgileri
  user: User;
  updateUser: (user: Partial<User>) => void;
  
  // En çok tüketilen ürünler
  topConsumedProducts: Product[];
  loadTopConsumedProducts: () => Promise<void>;
  
  // Yaklaşan indirimler
  upcomingDiscounts: Product[];
  loadUpcomingDiscounts: () => Promise<void>;
  saveDiscount: (productId: string) => Promise<void>;
  
  // Teklifler sayfası
  offers: Product[];
  filteredOffers: Product[];
  activeCategory: string;
  searchQuery: string;
  loadOffers: () => Promise<void>;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  
  // Harcama analizi
  totalSpending: number;
  spendingByCategory: {
    category: string;
    value: number;
    color: string;
  }[];
  topSpendingProducts: {
    name: string;
    amount: number;
  }[];
  loadSpendingData: () => Promise<void>;
  
  // Tarama işlevselliği
  scannedReceipt: string | null;
  scannedProduct: Product | null;
  scanReceipt: () => Promise<void>;
  scanBarcode: () => Promise<void>;
  
  // Kategoriler
  categories: { name: string; color: string }[];
  loadCategories: () => Promise<void>;
}

// Varsayılan kullanıcı
const defaultUser = {
  id: 1,
  name: 'Salih Tas',
  email: 'salihtas@example.com',
  dailySpendingLimit: 1,
  notificationsEnabled: true,
  language: 'en' as const
};

// Zustand store oluşturma
const useStore = create<AppState>((set, get) => ({
  // Veritabanı servisi
  dbService: null,
  setDbService: (service) => set({ dbService: service }),
  
  // Kullanıcı bilgileri
  user: defaultUser,
  
  // Kullanıcı bilgilerini güncelleme
  updateUser: async (userData) => {
    const { dbService, user } = get();
    
    if (dbService) {
      await dbService.updateUser(user.id, userData);
    }
    
    set((state) => ({
      user: { ...state.user, ...userData }
    }));
  },
  
  // En çok tüketilen ürünler (başlangıçta örnek veriler)
  topConsumedProducts: [
    { id: '1', name: 'Milk', count: 12 },
    { id: '2', name: 'Eggs', count: 10 },
    { id: '3', name: 'Bread', count: 8 }
  ],
  
  // En çok tüketilen ürünleri yükleme
  loadTopConsumedProducts: async () => {
    const { dbService, user } = get();
    
    if (dbService) {
      const result = await dbService.getTopConsumedProducts(user.id);
      if (result.success && result.results) {
        // Type assertion to ensure compatibility with Product type
        const products = result.results.map(item => ({
          id: String(item.id),
          name: String(item.name),
          count: Number(item.count)
        })) as Product[];
        
        set({ topConsumedProducts: products });
      }
    }
  },
  
  // Yaklaşan indirimler (başlangıçta örnek veriler)
  upcomingDiscounts: [
    { 
      id: '101', 
      name: 'Milk 1L', 
      store: 'LIDL', 
      discount: '20% OFF', 
      expiryInfo: 'Expires in 2 days' 
    },
    { 
      id: '102', 
      name: 'Eggs (10-pack)', 
      store: 'LIDL', 
      discount: '20% OFF', 
      expiryInfo: 'Starts tomorrow' 
    }
  ],
  
  // Yaklaşan indirimleri yükleme
  loadUpcomingDiscounts: async () => {
    const { dbService } = get();
    
    if (dbService) {
      const result = await dbService.getUpcomingDiscounts();
      if (result.success && result.results) {
        // Type assertion to ensure compatibility with Product type
        const discounts = result.results.map(item => ({
          id: String(item.id),
          name: String(item.name),
          store: String(item.store),
          discount: String(item.discount),
          expiryInfo: String(item.expiryInfo)
        })) as Product[];
        
        set({ upcomingDiscounts: discounts });
      }
    }
  },
  
  // İndirim kaydetme işlevi
  saveDiscount: async (productId) => {
    const { dbService, user } = get();
    
    if (dbService) {
      await dbService.saveDiscount(user.id, parseInt(productId));
    }
  },
  
  // Teklifler (başlangıçta örnek veriler)
  offers: [
    { 
      id: '201', 
      name: 'Butter 250g', 
      store: 'Carrefour', 
      discount: '15% OFF', 
      expiryInfo: 'Expires in 3 days',
      category: 'Dairy'
    },
    { 
      id: '202', 
      name: 'Eggs (10-pack)', 
      store: 'LIDL', 
      discount: '20% OFF', 
      expiryInfo: 'Starts tomorrow',
      category: 'Breakfast'
    },
    { 
      id: '203', 
      name: 'Chicken Breast', 
      store: 'Aldi', 
      discount: '10% OFF', 
      expiryInfo: 'Expires today',
      category: 'Meat'
    },
    { 
      id: '204', 
      name: 'Whole Wheat Bread', 
      store: 'LIDL', 
      discount: '25% OFF', 
      expiryInfo: 'Expires in 2 days',
      category: 'Bakery'
    }
  ],
  
  // Tüm teklifleri yükleme
  loadOffers: async () => {
    const { dbService } = get();
    
    if (dbService) {
      const result = await dbService.getAllOffers();
      if (result.success && result.results) {
        // Type assertion to ensure compatibility with Product type
        const offers = result.results.map(item => ({
          id: String(item.id),
          name: String(item.name),
          store: String(item.store),
          discount: String(item.discount),
          expiryInfo: String(item.expiryInfo),
          category: String(item.category)
        })) as Product[];
        
        set({ 
          offers: offers,
          filteredOffers: offers
        });
      }
    }
  },
  
  // Filtrelenmiş teklifler (başlangıçta tüm teklifler)
  filteredOffers: [],
  
  // Aktif kategori
  activeCategory: 'All',
  
  // Arama sorgusu
  searchQuery: '',
  
  // Kategori değiştirme işlevi
  setActiveCategory: (category) => set((state) => {
    const filtered = category === 'All' 
      ? state.offers 
      : state.offers.filter(offer => offer.category === category);
    
    return {
      activeCategory: category,
      filteredOffers: filtered.filter(offer => 
        offer.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    };
  }),
  
  // Arama sorgusu değiştirme işlevi
  setSearchQuery: (query) => set((state) => {
    const filtered = state.activeCategory === 'All' 
      ? state.offers 
      : state.offers.filter(offer => offer.category === state.activeCategory);
    
    return {
      searchQuery: query,
      filteredOffers: filtered.filter(offer => 
        offer.name.toLowerCase().includes(query.toLowerCase())
      )
    };
  }),
  
  // Toplam harcama
  totalSpending: 342.75,
  
  // Kategoriye göre harcama (örnek veriler)
  spendingByCategory: [
    { category: 'Meat', value: 45.30, color: '#f87171' },
    { category: 'Dairy', value: 32.50, color: '#60a5fa' },
    { category: 'Fruits & Vegetables', value: 28.75, color: '#6ee7b7' },
    { category: 'Bakery', value: 18.45, color: '#fcd34d' },
    { category: 'Others', value: 17.75, color: '#c4b5fd' }
  ],
  
  // Harcama verilerini yükleme
  loadSpendingData: async () => {
    const { dbService, user } = get();
    
    if (dbService) {
      try {
        // Toplam harcama
        const totalResult = await dbService.getTotalSpending(user.id);
        if (totalResult && totalResult.success && totalResult.results) {
          // Use optional chaining and type assertion to safely access the total property
          const total = (totalResult.results as Record<string, unknown>)?.total;
          set({ totalSpending: Number(total) || 0 });
        }
        
        // Kategoriye göre harcama
        const categoryResult = await dbService.getSpendingByCategory(user.id);
        if (categoryResult && categoryResult.success && categoryResult.results) {
          // Type assertion to ensure compatibility
          const categoryData = categoryResult.results.map(item => ({
            category: String(item.category),
            value: Number(item.value),
            color: String(item.color)
          }));
          
          set({ spendingByCategory: categoryData });
        }
        
        // En çok harcama yapılan ürünler
        const productsResult = await dbService.getTopSpendingProducts(user.id);
        if (productsResult && productsResult.success && productsResult.results) {
          // Type assertion to ensure compatibility
          const productsData = productsResult.results.map(item => ({
            name: String(item.name),
            amount: Number(item.amount)
          }));
          
          set({ topSpendingProducts: productsData });
        }
      } catch (error) {
        console.error('Error loading spending data:', error);
      }
    }
  },
  
  // En çok harcama yapılan ürünler (örnek veriler)
  topSpendingProducts: [
    { name: 'Meat Package', amount: 45.30 },
    { name: 'Cheese Selection', amount: 32.50 },
    { name: 'Organic Vegetables', amount: 28.75 },
    { name: 'Wine Bottle', amount: 24.99 },
    { name: 'Bread Assortment', amount: 18.45 }
  ],
  
  // Taranan fiş
  scannedReceipt: null,
  
  // Taranan ürün
  scannedProduct: null,
  
  // Fiş tarama işlevi
  scanReceipt: async () => {
    // Gerçek uygulamada kamera API'si kullanılacak
    console.log('Scanning receipt...');
    
    // Simüle edilmiş tarama sonucu
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    set({
      scannedReceipt: 'Receipt data would be processed here'
    });
    
    // Gerçek uygulamada, taranan fiş verilerinden harcama kaydı oluşturulacak
    // const { dbService, user } = get();
    // if (dbService) {
    //   await dbService.addExpenseFromReceipt(user.id, 'Scanned Product', 1, 12.99);
    // }
  },
  
  // Barkod tarama işlevi
  scanBarcode: async () => {
    // Gerçek uygulamada kamera API'si kullanılacak
    console.log('Scanning barcode...');
    
    // Simüle edilmiş tarama sonucu
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    set({
      scannedProduct: {
        id: '301',
        name: 'Organic Milk 1L',
        price: 1.99,
        category: 'Dairy'
      }
    });
  },
  
  // Kategoriler
  categories: [],
  
  // Kategorileri yükleme
  loadCategories: async () => {
    const { dbService } = get();
    
    if (dbService) {
      const result = await dbService.getAllCategories();
      if (result && result.success && result.results) {
        // Type assertion to ensure compatibility
        const categoriesData = result.results.map(item => ({
          name: String(item.name),
          color: String(item.color)
        }));
        
        set({ categories: categoriesData });
      }
    }
  }
}));

export default useStore;
