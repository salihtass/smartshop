import React from 'react';
import useStore from '@/lib/store';
import DatabaseService from '@/lib/database';

export default function DbInitializer({ children }: { children: React.ReactNode }) {
  const { setDbService, loadCategories, loadTopConsumedProducts, loadUpcomingDiscounts, loadOffers, loadSpendingData } = useStore();
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const initializeDb = async () => {
      try {
        // In development, we'll use mock data from the store
        // In production, we'd initialize the real database connection
        if (process.env.NODE_ENV === 'production') {
          // @ts-expect-error - Cloudflare D1 binding will be available in production
          const db = env.DB;
          if (db) {
            const dbService = new DatabaseService(db);
            setDbService(dbService);
            
            // Load initial data
            await Promise.all([
              loadCategories(),
              loadTopConsumedProducts(),
              loadUpcomingDiscounts(),
              loadOffers(),
              loadSpendingData()
            ]);
          }
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setIsInitialized(true); // Continue with mock data
      }
    };

    initializeDb();
  }, [setDbService, loadCategories, loadTopConsumedProducts, loadUpcomingDiscounts, loadOffers, loadSpendingData]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SpendSmart...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
