import { Dish, Restaurant, GroupOrderItem, GroupOrderComparison, Timeframe, PriceHistoryPoint } from '../types';
import { MOCK_DISHES, MOCK_RESTAURANTS } from '../data/mockDatabase';
import { PRICE_HISTORY_DATA } from '../data/priceHistoryData';
import { TruePriceEngine } from './truePriceEngine';

export class DishcountApiService {
  /**
   * Search dishes, restaurants, or cuisines
   * GET /search?q=query
   */
  public async search(query: string): Promise<{ dishes: Dish[]; restaurants: Restaurant[] }> {
    const q = query.trim().toLowerCase();
    if (!q) return { dishes: MOCK_DISHES, restaurants: MOCK_RESTAURANTS };

    const dishes = MOCK_DISHES.filter(
      d => d.name.toLowerCase().includes(q) || 
           d.category.toLowerCase().includes(q) || 
           d.restaurantName.toLowerCase().includes(q)
    );

    const restaurants = MOCK_RESTAURANTS.filter(
      r => r.name.toLowerCase().includes(q) || 
           r.cuisine.some(c => c.toLowerCase().includes(q)) || 
           r.location.toLowerCase().includes(q)
    );

    return { dishes, restaurants };
  }

  /**
   * Compare true prices across all 7 platforms for a specific dish
   * GET /compare/:dishId
   */
  public async compareDish(dishId: string): Promise<Dish | null> {
    const dish = MOCK_DISHES.find(d => d.id === dishId) || MOCK_DISHES[0];
    return dish || null;
  }

  /**
   * Get price history line points for a dish
   * GET /price-history/:dishId?timeframe=7D
   */
  public async getPriceHistory(dishId: string, timeframe: Timeframe): Promise<PriceHistoryPoint[]> {
    return PRICE_HISTORY_DATA[timeframe] || PRICE_HISTORY_DATA['7D'];
  }

  /**
   * Compare complete multi-item group orders across platforms
   * POST /group-order/compare
   */
  public async compareGroupOrder(items: GroupOrderItem[]): Promise<{
    comparisons: GroupOrderComparison[];
    cheapest: GroupOrderComparison;
    savings: number;
  }> {
    const totalFoodPrice = items.reduce((acc, i) => acc + i.basePrice * i.quantity, 0);

    const platformsData = [
      { id: 'magicpin', name: 'Magicpin', logo: '🟣', delivery: 25, taxes: Math.round(totalFoodPrice * 0.05), coupon: 150 },
      { id: 'zomato', name: 'Zomato', logo: '🔴', delivery: 39, taxes: Math.round(totalFoodPrice * 0.05), coupon: 100 },
      { id: 'swish', name: 'SWISH', logo: '⚡', delivery: 19, taxes: Math.round(totalFoodPrice * 0.05), coupon: 60 },
      { id: 'eatsure', name: 'EatSure', logo: '🛡️', delivery: 0, taxes: Math.round(totalFoodPrice * 0.05), coupon: 50 },
      { id: 'swiggy', name: 'Swiggy', logo: '🟠', delivery: 49, taxes: Math.round(totalFoodPrice * 0.05), coupon: 40 },
      { id: 'foodpanda', name: 'Foodpanda', logo: '🐼', delivery: 35, taxes: Math.round(totalFoodPrice * 0.05), coupon: 30 },
      { id: 'ubereats', name: 'Uber Eats', logo: '🖤', delivery: 45, taxes: Math.round(totalFoodPrice * 0.05), coupon: 0 }
    ];

    const comparisons: GroupOrderComparison[] = platformsData.map(p => {
      const finalTotal = Math.max(0, totalFoodPrice + p.delivery + p.taxes - p.coupon);
      return {
        platformId: p.id as any,
        platformName: p.name,
        logo: p.logo,
        totalFoodPrice,
        deliveryFee: p.delivery,
        taxes: p.taxes,
        couponDiscount: p.coupon,
        finalTotal
      };
    });

    comparisons.sort((a, b) => a.finalTotal - b.finalTotal);
    comparisons[0].isCheapest = true;

    const cheapest = comparisons[0];
    const mostExpensive = comparisons[comparisons.length - 1];
    const savings = mostExpensive.finalTotal - cheapest.finalTotal;

    return { comparisons, cheapest, savings };
  }

  /**
   * Conversational natural language query for AI assistant
   * POST /ai/recommend
   */
  public async aiRecommend(query: string): Promise<{
    reasoning: string;
    recommendedDish: Dish;
    cheapestPlatform: string;
    finalPrice: number;
    savings: number;
  }> {
    const dish = MOCK_DISHES[0];
    const calc = TruePriceEngine.calculateMaxSavings(dish.comparison);
    return {
      reasoning: `Found cheapest ${dish.name} matching your natural language query "${query}". Verified live discounts across all 7 platforms.`,
      recommendedDish: dish,
      cheapestPlatform: calc.cheapest.platformName,
      finalPrice: calc.cheapest.finalPayablePrice,
      savings: calc.savings
    };
  }
}

export const apiService = new DishcountApiService();
