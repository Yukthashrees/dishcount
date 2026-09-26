import { Restaurant, Dish } from '../types';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  isVeg: boolean;
  image: string;
  bestPlatform: string;
  bestPrice: number;
}

export interface DetailedRestaurant extends Restaurant {
  venueType: 'RESTAURANT' | 'BREWERY' | 'CAFE' | 'FINE_DINING';
  moods: ('Quiet' | 'Romantic' | 'Cozy' | 'Social' | 'Celebrate' | 'Late Night')[];
  area: string;
  isFamous: boolean;
  menuCategories: string[];
  fullMenu: MenuItem[];
}

export const MOCK_DISHES: Dish[] = [
  {
    id: 'dish-1',
    restaurantId: 'rest-1',
    restaurantName: 'Empire Restaurant',
    name: 'Chicken Dum Biryani',
    description: 'Aged long-grain Basmati rice cooked with succulent chicken pieces, saffron, fried onions & pure ghee.',
    category: 'Biryani',
    basePrice: 320,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    deliveryTimeAvg: '22 mins',
    priceRange: '₹307 – ₹369',
    comparison: [
      { platformId: 'magicpin', platformName: 'Magicpin', logo: '🟣', status: 'BEST PRICE', statusDetail: '₹59 cheaper than Swiggy', basePrice: 320, restaurantDiscount: 40, couponDiscount: 36, deliveryFee: 25, platformFee: 4, taxes: 19, packagingFee: 15, cashback: 30, finalPayablePrice: 307, couponCode: 'SUPERPIN60', deliveryTimeMinutes: 24, dealScore: 98, scoreReason: 'Best overall price tonight' },
      { platformId: 'zomato', platformName: 'Zomato', logo: '🔴', status: 'AVAILABLE', statusDetail: 'Zomato Gold discount applied', basePrice: 320, restaurantDiscount: 30, couponDiscount: 18, deliveryFee: 35, platformFee: 5, taxes: 14, packagingFee: 15, cashback: 0, finalPayablePrice: 341, couponCode: 'ZOMGOLD50', deliveryTimeMinutes: 20, dealScore: 91, scoreReason: 'Fast & reliable' },
      { platformId: 'swish', platformName: 'SWISH', logo: '⚡', status: 'FASTEST', statusDetail: '10-minute lightning dispatch', basePrice: 320, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 25, platformFee: 4, taxes: 17, packagingFee: 15, cashback: 0, finalPayablePrice: 351, couponCode: 'SWISH10M', deliveryTimeMinutes: 10, dealScore: 93, scoreReason: 'Fastest 10m delivery' },
      { platformId: 'foodpanda', platformName: 'Foodpanda', logo: '🐼', status: 'AVAILABLE', statusDetail: 'Voucher auto-applied', basePrice: 320, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 28, platformFee: 5, taxes: 14, packagingFee: 15, cashback: 0, finalPayablePrice: 352, couponCode: 'PANDA30', deliveryTimeMinutes: 25, dealScore: 88, scoreReason: 'Standard panda deal' },
      { platformId: 'eatsure', platformName: 'EatSure', logo: '🛡️', status: 'AVAILABLE', statusDetail: 'Zero platform fee guarantee', basePrice: 320, restaurantDiscount: 15, couponDiscount: 0, deliveryFee: 20, platformFee: 0, taxes: 16, packagingFee: 15, cashback: 0, finalPayablePrice: 356, couponCode: 'SUREPASS', deliveryTimeMinutes: 28, dealScore: 86, scoreReason: 'Zero platform fees' },
      { platformId: 'swiggy', platformName: 'Swiggy', logo: '🟠', status: 'AVAILABLE', statusDetail: 'Swiggy One member perks', basePrice: 320, restaurantDiscount: 20, couponDiscount: 15, deliveryFee: 45, platformFee: 7, taxes: 14, packagingFee: 15, cashback: 0, finalPayablePrice: 366, couponCode: 'SWIGGYIT50', deliveryTimeMinutes: 26, dealScore: 82, scoreReason: 'Higher delivery fee' },
      { platformId: 'ubereats', platformName: 'Uber Eats', logo: '🖤', status: 'NO OFFER', statusDetail: 'No active promo applied', basePrice: 320, restaurantDiscount: 0, couponDiscount: 0, deliveryFee: 35, platformFee: 7, taxes: 12, packagingFee: 15, cashback: 0, finalPayablePrice: 369, couponCode: 'NONE', deliveryTimeMinutes: 32, dealScore: 78, scoreReason: 'Full rate pricing' }
    ]
  },
  {
    id: 'dish-2',
    restaurantId: 'fine-1',
    restaurantName: 'La Piazza Trattoria',
    name: 'Cheesy Truffle Pizza',
    description: '72-hour sourdough crust, San Marzano tomatoes, fresh burrata, wild porcini & black truffle oil.',
    category: 'Pizza',
    basePrice: 480,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    deliveryTimeAvg: '26 mins',
    priceRange: '₹389 – ₹485',
    comparison: [
      { platformId: 'zomato', platformName: 'Zomato', logo: '🔴', status: 'BEST PRICE', statusDetail: 'Save ₹96 on Zomato Pro', basePrice: 480, restaurantDiscount: 60, couponDiscount: 60, deliveryFee: 20, platformFee: 5, taxes: 24, packagingFee: 20, cashback: 0, finalPayablePrice: 389, couponCode: 'ZOMATOPRO', deliveryTimeMinutes: 24, dealScore: 96, scoreReason: 'Best overall deal' },
      { platformId: 'swiggy', platformName: 'Swiggy', logo: '🟠', status: 'AVAILABLE', statusDetail: 'Standard offer', basePrice: 480, restaurantDiscount: 40, couponDiscount: 30, deliveryFee: 35, platformFee: 6, taxes: 24, packagingFee: 20, cashback: 0, finalPayablePrice: 445, couponCode: 'PIZZAFEST', deliveryTimeMinutes: 26, dealScore: 85, scoreReason: 'Standard price' },
      { platformId: 'magicpin', platformName: 'Magicpin', logo: '🟣', status: 'AVAILABLE', statusDetail: 'Magicpin points valid', basePrice: 480, restaurantDiscount: 30, couponDiscount: 20, deliveryFee: 25, platformFee: 4, taxes: 24, packagingFee: 20, cashback: 18, finalPayablePrice: 485, couponCode: 'MAGICPIZZA', deliveryTimeMinutes: 28, dealScore: 80, scoreReason: 'Includes cashback' }
    ]
  },
  {
    id: 'dish-3',
    restaurantId: 'cafe-1',
    restaurantName: 'Subko Craft Bakehouse',
    name: 'Single Origin Iced Cold Brew',
    description: 'Double shot specialty espresso extracted over oat milk paired with warm house cardamom knot.',
    category: 'Coffee',
    basePrice: 280,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    deliveryTimeAvg: '18 mins',
    priceRange: '₹210 – ₹310',
    comparison: [
      { platformId: 'swiggy', platformName: 'Swiggy', logo: '🟠', status: 'BEST PRICE', statusDetail: 'Coffee festival discount', basePrice: 280, restaurantDiscount: 40, couponDiscount: 30, deliveryFee: 15, platformFee: 5, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: 232, couponCode: 'COFFEELOVER', deliveryTimeMinutes: 18, dealScore: 97, scoreReason: 'Best overall price' },
      { platformId: 'swish', platformName: 'SWISH', logo: '⚡', status: 'FASTEST', statusDetail: '10 min express dispatch', basePrice: 280, restaurantDiscount: 30, couponDiscount: 20, deliveryFee: 12, platformFee: 4, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: 258, couponCode: 'SWISHBEANS', deliveryTimeMinutes: 10, dealScore: 94, scoreReason: 'Fastest 10m delivery' }
    ]
  }
];

export const DETAILED_RESTAURANTS: DetailedRestaurant[] = [
  // SPECIALTY SANDWICH CAFES & BAKEHOUSES
  {
    id: 'cafe-1',
    name: 'Subko Craft Bakehouse & Sandwich Bar',
    cuisine: ['Gourmet Sandwiches', 'Artisanal Coffee', 'Quiet Bakehouse'],
    location: 'Indiranagar, Bengaluru',
    area: 'Indiranagar',
    distance: '0.6 km',
    rating: 4.9,
    ratingCount: '2.4k',
    venueType: 'CAFE',
    moods: ['Quiet', 'Romantic', 'Cozy'],
    isFamous: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'SWISH',
    startingFinalPrice: 245,
    popularDishes: [],
    menuCategories: ['Artisanal Sandwiches & Toasties', 'Specialty Coffee', 'Viennoiserie'],
    fullMenu: [
      { id: 'sw1', name: 'Sourdough Truffle Mushroom Toastie', description: 'Wild portobello mushrooms, melted Gruyère cheese, & truffle butter on house sourdough.', category: 'Artisanal Sandwiches & Toasties', price: 290, rating: 4.9, isVeg: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 245 },
      { id: 'sw2', name: 'Smoked Chicken Jalapeño Melt', description: 'Hickory smoked chicken breast, pickled jalapeños & sharp cheddar pressed in sourdough.', category: 'Artisanal Sandwiches & Toasties', price: 320, rating: 4.8, isVeg: false, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 275 },
      { id: 'sw3', name: 'Avocado & Soft Scrambled Egg Brioche', description: 'Hass avocado mash, creamy chive eggs & chili oil on toasted brioche bread.', category: 'Artisanal Sandwiches & Toasties', price: 340, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Zomato', bestPrice: 290 }
    ]
  },
  {
    id: 'cafe-3',
    name: 'Third Wave Coffee & Toastie Studio',
    cuisine: ['Gourmet Sandwiches', 'Warm Paninis', 'Cozy Work Cafe'],
    location: 'HSR Layout, Bengaluru',
    area: 'HSR Layout',
    distance: '1.3 km',
    rating: 4.8,
    ratingCount: '3.4k',
    venueType: 'CAFE',
    moods: ['Cozy', 'Quiet'],
    isFamous: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'Magicpin',
    startingFinalPrice: 165,
    popularDishes: [],
    menuCategories: ['Panini Sandwiches', 'Classic Toasties', 'Combos'],
    fullMenu: [
      { id: 'tw-s1', name: 'Panini Grilled Pesto Chicken Sandwich', description: 'Herb chicken, basil pesto & fior di latte mozzarella grilled in focaccia.', category: 'Panini Sandwiches', price: 290, rating: 4.8, isVeg: false, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 240 },
      { id: 'tw-s2', name: 'Bombay Spiced Potato & Cheese Grill', description: 'Street-style spiced potato masala, green chutney, nylon sev & cheddar.', category: 'Classic Toasties', price: 190, rating: 4.7, isVeg: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 165 },
      { id: 'tw-s3', name: 'Triple Decker Club Sandwich + Cold Brew Combo', description: 'Layered chicken salad, fried egg, lettuce, tomato & fresh iced cold brew.', category: 'Combos', price: 380, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1567237869899-c21581932081?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Swiggy', bestPrice: 320 }
    ]
  },
  {
    id: 'cafe-2',
    name: "Glen's Bakehouse & Garden Bistro",
    cuisine: ['European Sandwiches', 'Garden Cafe', 'Romantic Bistro'],
    location: 'Indiranagar, Bengaluru',
    area: 'Indiranagar',
    distance: '1.0 km',
    rating: 4.8,
    ratingCount: '6.2k',
    venueType: 'CAFE',
    moods: ['Romantic', 'Quiet', 'Cozy'],
    isFamous: true,
    image: 'https://images.unsplash.com/photo-1567237869899-c21581932081?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'Magicpin',
    startingFinalPrice: 240,
    popularDishes: [],
    menuCategories: ['Croissant Sandwiches', 'Focaccia Paninis', 'Desserts'],
    fullMenu: [
      { id: 'gb-s1', name: 'Artisanal Smoked Turkey & Cheese Croissant', description: 'Flaky buttery croissant stuffed with smoked turkey breast, honey mustard & Swiss cheese.', category: 'Croissant Sandwiches', price: 310, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1567237869899-c21581932081?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 265 },
      { id: 'gb-s2', name: 'Tuscan Caprese Focaccia Sandwich', description: 'Fresh buffalo mozzarella, ripe vine tomatoes, extra virgin olive oil & pesto.', category: 'Focaccia Paninis', price: 280, rating: 4.8, isVeg: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 240 }
    ]
  },
  {
    id: 'rest-6',
    name: 'Subway Gourmet Sandwiches',
    cuisine: ['Custom Subs', 'Healthy Wraps', 'Salads'],
    location: 'Koramangala, Bengaluru',
    area: 'Koramangala',
    distance: '0.9 km',
    rating: 4.6,
    ratingCount: '8.1k',
    venueType: 'RESTAURANT',
    moods: ['Social', 'Cozy'],
    isFamous: true,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'EatSure',
    startingFinalPrice: 215,
    popularDishes: [],
    menuCategories: ['Gourmet Subs', 'Sub Combos'],
    fullMenu: [
      { id: 'sub1', name: 'Roasted Chicken Sub (6 inch)', description: 'Tender roasted chicken breast with choice of fresh veggies & sauces on parmesan oregano bread.', category: 'Gourmet Subs', price: 260, rating: 4.7, isVeg: false, image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80', bestPlatform: 'EatSure', bestPrice: 215 },
      { id: 'sub2', name: 'Paneer Tikka Sub & Drink Combo', description: 'Spicy paneer tikka sub served with crispy chips & chilled beverage.', category: 'Sub Combos', price: 330, rating: 4.7, isVeg: true, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Zomato', bestPrice: 285 }
    ]
  },

  // RESTAURANTS
  {
    id: 'rest-1',
    name: 'Empire Restaurant',
    cuisine: ['Hyderabadi', 'Biryani', 'Kathi Rolls', 'Mughlai'],
    location: 'Koramangala, Bengaluru',
    area: 'Koramangala',
    distance: '0.8 km',
    rating: 4.8,
    ratingCount: '3.2k',
    venueType: 'RESTAURANT',
    moods: ['Late Night', 'Social', 'Cozy'],
    isFamous: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'Magicpin',
    startingFinalPrice: 307,
    popularDishes: [MOCK_DISHES[0]],
    menuCategories: ['Starters & Rolls', 'Biryani Specialties', 'Main Course Curry', 'Breads & Accompaniments'],
    fullMenu: [
      { id: 'm1', name: 'Chicken Dum Biryani', description: 'Aged long-grain Basmati rice with succulent chicken & saffron ghee.', category: 'Biryani Specialties', price: 320, rating: 4.8, isVeg: false, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 307 },
      { id: 'm2', name: 'Empire Special Chicken Kathi Roll', description: 'Flaky paratha loaded with spiced grilled chicken tikka, eggs & green chutney.', category: 'Starters & Rolls', price: 210, rating: 4.7, isVeg: false, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 195 }
    ]
  },
  {
    id: 'rest-2',
    name: 'Meghana Foods',
    cuisine: ['Andhra Biryani', 'Spicy Andhra', 'Chicken Specialties'],
    location: 'Indiranagar, Bengaluru',
    area: 'Indiranagar',
    distance: '1.4 km',
    rating: 4.9,
    ratingCount: '5.8k',
    venueType: 'RESTAURANT',
    moods: ['Social', 'Late Night', 'Cozy'],
    isFamous: true,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'SWISH',
    startingFinalPrice: 295,
    popularDishes: [MOCK_DISHES[0]],
    menuCategories: ['Biryani Special', 'Andhra Starters'],
    fullMenu: [
      { id: 'mf1', name: 'Meghana Special Chicken Biryani', description: 'Signature spicy Guntur chili chicken layered with aromatic rice.', category: 'Biryani Special', price: 330, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 295 }
    ]
  },
  {
    id: 'brew-1',
    name: 'Toit Brewpub',
    cuisine: ['Craft Beer', 'Woodfired Pizza', 'Brewery Eats'],
    location: 'Indiranagar, Bengaluru',
    area: 'Indiranagar',
    distance: '1.2 km',
    rating: 4.9,
    ratingCount: '8.4k',
    venueType: 'BREWERY',
    moods: ['Social', 'Romantic', 'Celebrate', 'Late Night'],
    isFamous: true,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'Zomato',
    startingFinalPrice: 380,
    popularDishes: [],
    menuCategories: ['Brewery Bites', 'Woodfired Pizza'],
    fullMenu: [
      { id: 'tb1', name: 'Toit BBQ Chicken Wings', description: 'House craft ale glazed chicken wings served with creamy blue cheese dip.', category: 'Brewery Bites', price: 340, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Zomato', bestPrice: 310 }
    ]
  }
];

export const MOCK_RESTAURANTS: Restaurant[] = DETAILED_RESTAURANTS;
