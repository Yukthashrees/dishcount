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
    restaurantId: 'rest-2',
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
    restaurantId: 'rest-3',
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
  {
    id: 'rest-1',
    name: 'Empire Restaurant',
    cuisine: ['Hyderabadi', 'Biryani', 'Kathi Rolls', 'Mughlai'],
    location: 'Koramangala, Bengaluru',
    distance: '2.4 km',
    rating: 4.8,
    ratingCount: '3.2k',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'Magicpin',
    startingFinalPrice: 307,
    popularDishes: [MOCK_DISHES[0]],
    menuCategories: ['Starters & Rolls', 'Biryani Specialties', 'Main Course Curry', 'Breads & Accompaniments', 'Beverages & Desserts'],
    fullMenu: [
      { id: 'm1', name: 'Chicken Dum Biryani', description: 'Aged long-grain Basmati rice with succulent chicken & saffron ghee.', category: 'Biryani Specialties', price: 320, rating: 4.8, isVeg: false, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 307 },
      { id: 'm2', name: 'Empire Special Chicken Kathi Roll', description: 'Flaky paratha loaded with spiced grilled chicken tikka, eggs & green chutney.', category: 'Starters & Rolls', price: 210, rating: 4.7, isVeg: false, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 195 },
      { id: 'm3', name: 'Paneer Tikka Roll', description: 'Charcoal grilled cottage cheese cubes wrapped in layered rumali roti.', category: 'Starters & Rolls', price: 190, rating: 4.6, isVeg: true, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 178 },
      { id: 'm4', name: 'Mutton Shahi Biryani', description: 'Tender lamb chops layered with aromatic spiced basmati rice and saffron.', category: 'Biryani Specialties', price: 420, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Zomato', bestPrice: 395 },
      { id: 'm5', name: 'Butter Chicken Masala', description: 'Velvety rich tomato butter gravy infused with roasted fenugreek & cream.', category: 'Main Course Curry', price: 340, rating: 4.8, isVeg: false, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80', bestPlatform: 'EatSure', bestPrice: 310 },
      { id: 'm6', name: 'Garlic Butter Naan', description: 'Tandoor baked soft flatbread brushed with fresh garlic & melted butter.', category: 'Breads & Accompaniments', price: 65, rating: 4.5, isVeg: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 55 },
      { id: 'm7', name: 'Royal Shahi Tukda', description: 'Crispy fried bread soaked in saffron rabri topped with silver foil & pistachio.', category: 'Beverages & Desserts', price: 150, rating: 4.9, isVeg: true, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Swiggy', bestPrice: 135 }
    ]
  },
  {
    id: 'rest-2',
    name: 'Meghana Foods',
    cuisine: ['Andhra Biryani', 'Spicy Andhra', 'Chicken Specialties'],
    location: 'Indiranagar, Bengaluru',
    distance: '1.9 km',
    rating: 4.9,
    ratingCount: '5.8k',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'SWISH',
    startingFinalPrice: 295,
    popularDishes: [MOCK_DISHES[0]],
    menuCategories: ['Biryani Special', 'Andhra Starters', 'Curries & Meals', 'Beverages'],
    fullMenu: [
      { id: 'mf1', name: 'Meghana Special Chicken Biryani', description: 'Signature spicy Guntur chili chicken layered with aromatic rice.', category: 'Biryani Special', price: 330, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 295 },
      { id: 'mf2', name: 'Boneless Chicken 65', description: 'Deep fried crispy chicken cubes tossed in spicy curry leaves & yogurt.', category: 'Andhra Starters', price: 290, rating: 4.8, isVeg: false, image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 260 },
      { id: 'mf3', name: 'Paneer Biryani', description: 'Marinated cottage cheese cooked with aromatic Andhra green chili gravy.', category: 'Biryani Special', price: 290, rating: 4.7, isVeg: true, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Zomato', bestPrice: 270 },
      { id: 'mf4', name: 'Guntur Chili Chicken Fry', description: 'Fiery dry chicken fry infused with ground red chilies & peppercorns.', category: 'Andhra Starters', price: 310, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', bestPlatform: 'EatSure', bestPrice: 285 }
    ]
  },
  {
    id: 'rest-3',
    name: 'Kathi Roll Express & Wraps',
    cuisine: ['Rolls', 'Street Food', 'Kebab Wraps'],
    location: 'HSR Layout, Bengaluru',
    distance: '1.5 km',
    rating: 4.7,
    ratingCount: '2.1k',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'SWISH',
    startingFinalPrice: 165,
    popularDishes: [],
    menuCategories: ['Kolkata Kathi Rolls', 'Gourmet Wraps', 'Combos & Beverages'],
    fullMenu: [
      { id: 'kr1', name: 'Double Egg Double Chicken Roll', description: 'Crispy laccha paratha with double spiced chicken tikka & dual egg coating.', category: 'Kolkata Kathi Rolls', price: 220, rating: 4.8, isVeg: false, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 185 },
      { id: 'kr2', name: 'Paneer Makhani Kathi Roll', description: 'Tender cottage cheese tikka with rich makhani gravy wrapped in flaky flatbread.', category: 'Kolkata Kathi Rolls', price: 180, rating: 4.7, isVeg: true, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 155 },
      { id: 'kr3', name: 'Mutton Seekh Kebab Wrap', description: 'Charcoal grilled minced lamb kebabs with mint chutney & pickled onions.', category: 'Gourmet Wraps', price: 250, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Zomato', bestPrice: 220 }
    ]
  },
  {
    id: 'rest-4',
    name: 'La Piazza Trattoria',
    cuisine: ['Italian', 'Woodfired Pizza', 'Artisanal Pasta'],
    location: 'Indiranagar, Bengaluru',
    distance: '3.1 km',
    rating: 4.9,
    ratingCount: '1.8k',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80',
    bestPlatform: 'Zomato',
    startingFinalPrice: 389,
    popularDishes: [MOCK_DISHES[1]],
    menuCategories: ['Woodfired Pizza', 'Handmade Pasta', 'Antipasti & Salads', 'Italian Desserts'],
    fullMenu: [
      { id: 'lp1', name: 'Cheesy Truffle Pizza', description: 'Sourdough crust, fresh burrata, wild porcini & black truffle oil.', category: 'Woodfired Pizza', price: 480, rating: 4.9, isVeg: true, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Zomato', bestPrice: 389 },
      { id: 'lp2', name: 'Fettuccine Creamy Alfredo', description: 'Fresh egg pasta tossed in aged Parmigiano Reggiano & butter cream sauce.', category: 'Handmade Pasta', price: 420, rating: 4.8, isVeg: true, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Swiggy', bestPrice: 370 },
      { id: 'lp3', name: 'Woodfired Pepperoni Feast', description: 'Neapolitan dough topped with spicy pork pepperoni & fior di latte mozzarella.', category: 'Woodfired Pizza', price: 540, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80', bestPlatform: 'EatSure', bestPrice: 480 }
    ]
  }
];

export const MOCK_RESTAURANTS: Restaurant[] = DETAILED_RESTAURANTS;
