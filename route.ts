import { NextRequest } from 'next/server';
import DatabaseService from '@/lib/database';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  const userId = parseInt(searchParams.get('userId') || '1');
  
  // @ts-expect-error - Cloudflare D1 binding will be available in production
  const db = process.env.NODE_ENV === 'production' ? env.DB : null;
  
  if (!db) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Database not available in development mode' 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const dbService = new DatabaseService(db);
  
  try {
    let result;
    
    switch (endpoint) {
      case 'user':
        result = await dbService.getUser(userId);
        break;
      case 'categories':
        result = await dbService.getAllCategories();
        break;
      case 'topConsumedProducts':
        result = await dbService.getTopConsumedProducts(userId);
        break;
      case 'upcomingDiscounts':
        result = await dbService.getUpcomingDiscounts();
        break;
      case 'offers':
        result = await dbService.getAllOffers();
        break;
      case 'totalSpending':
        result = await dbService.getTotalSpending(userId);
        break;
      case 'spendingByCategory':
        result = await dbService.getSpendingByCategory(userId);
        break;
      case 'topSpendingProducts':
        result = await dbService.getTopSpendingProducts(userId);
        break;
      default:
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Invalid endpoint' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      results: result 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
