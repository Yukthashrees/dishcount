export type PlatformId = 
  | 'swiggy' 
  | 'zomato' 
  | 'eatsure' 
  | 'swish' 
  | 'magicpin' 
  | 'foodpanda' 
  | 'ubereats';

export type PlatformStatus = 
  | 'AVAILABLE' 
  | 'BEST PRICE' 
  | 'FASTEST' 
  | 'NO OFFER' 
  | 'MEMBERSHIP REQUIRED' 
  | 'MINIMUM ORDER' 
  | 'UNAVAILABLE';

export interface PlatformPriceBreakdown {
  platformId: PlatformId;
  platformName: string;
  logo: string;
  status: PlatformStatus;
  statusDetail?: string;
  basePrice: number;
  restaurantDiscount: number;
  couponDiscount: number;
  deliveryFee: number;
  platformFee: number;
  taxes: number;
  packagingFee: number;
  cashback: number;
  finalPayablePrice: number;
  couponCode: string;
  deliveryTimeMinutes: number;
  dealScore: number; // 0 - 100
  scoreReason: string; // e.g. "Best overall deal" or "₹41 cheaper but 18 min slower"
  minOrderRequired?: number;
  membershipRequired?: boolean;
}

export interface Dish {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  image: string;
  rating: number;
  deliveryTimeAvg: string;
  priceRange: string;
  comparison: PlatformPriceBreakdown[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  location: string;
  distance: string;
  rating: number;
  ratingCount: string;
  image: string;
  bestPlatform: string;
  startingFinalPrice: number;
  popularDishes: Dish[];
}

export interface PriceHistoryPoint {
  label: string;
  price: number;
  platform: string;
  offer: string;
}

export type Timeframe = '24H' | '7D' | '30D' | '3M';

export interface GroupOrderItem {
  dishId: string;
  dishName: string;
  quantity: number;
  basePrice: number;
}

export interface GroupOrderComparison {
  platformId: PlatformId;
  platformName: string;
  logo: string;
  totalFoodPrice: number;
  deliveryFee: number;
  taxes: number;
  couponDiscount: number;
  finalTotal: number;
  isCheapest?: boolean;
}

export interface PriceAlert {
  id: string;
  dishId: string;
  dishName: string;
  currentPrice: number;
  targetPrice: number;
  createdAt: string;
}

export interface FavoriteItem {
  id: string;
  dishId: string;
  dishName: string;
  restaurantName: string;
  bestPlatform: string;
  currentCheapestPrice: number;
  savedAmount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  membershipLevel: 'ROYAL' | 'STANDARD';
  totalSaved: number;
  savedCount: number;
}

export interface Offer {
  id: string;
  platformId: PlatformId;
  title: string;
  code: string;
  discountAmount: number;
  minSpend: number;
  description: string;
}

export interface Recommendation {
  dishName: string;
  restaurantName: string;
  bestPlatform: string;
  finalPrice: number;
  savings: number;
  reason: string;
  matchScore: number;
}

export type ChoiceMode = 'CHEAPEST' | 'FASTEST' | 'BEST VALUE';
