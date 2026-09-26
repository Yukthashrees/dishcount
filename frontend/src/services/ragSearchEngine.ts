import { DetailedRestaurant } from '../data/mockDatabase';

export interface RAGSearchMatch {
  query: string;
  category: string;
  matchedRestaurants: DetailedRestaurant[];
}

export class RAGSearchEngine {
  private static DYNAMIC_KNOWLEDGE_BASE: Record<string, {
    cuisine: string;
    restaurants: Array<{
      id: string;
      name: string;
      cuisine: string[];
      location: string;
      area: string;
      distance: string;
      rating: number;
      ratingCount: string;
      venueType: 'RESTAURANT' | 'BREWERY' | 'CAFE' | 'FINE_DINING';
      moods: ('Quiet' | 'Romantic' | 'Cozy' | 'Social' | 'Celebrate' | 'Late Night')[];
      isFamous: boolean;
      image: string;
      bestPlatform: string;
      startingFinalPrice: number;
      menuCategories: string[];
      fullMenu: Array<{
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
      }>;
    }>;
  }> = {
    sushi: {
      cuisine: 'Japanese & Asian',
      restaurants: [
        {
          id: 'sushi-1',
          name: 'Shiro Japanese & Izakaya Bar',
          cuisine: ['Japanese', 'Sushi', 'Asian Fine Dining'],
          location: 'UB City / Lavelle Road, Bengaluru',
          area: 'UB City',
          distance: '1.8 km',
          rating: 4.9,
          ratingCount: '3.8k',
          venueType: 'FINE_DINING',
          moods: ['Romantic', 'Celebrate', 'Quiet'],
          isFamous: true,
          image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
          bestPlatform: 'Zomato',
          startingFinalPrice: 420,
          menuCategories: ['Signature Maki Rolls', 'Nigiri & Sashimi', 'Sushi Combos'],
          fullMenu: [
            { id: 's1', name: 'Salmon & Avocado Maki Roll (8 Pcs)', description: 'Norwegian fresh salmon, Hass avocado, Japanese mayo & toasted sesame.', category: 'Signature Maki Rolls', price: 540, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Zomato', bestPrice: 460 },
            { id: 's2', name: 'Crispy Ebi Tempura Prawn Roll', description: 'Crunchy prawn tempura, cucumber, spicy sriracha mayo & tobiko.', category: 'Signature Maki Rolls', price: 490, rating: 4.8, isVeg: false, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Swiggy', bestPrice: 420 },
            { id: 's3', name: 'Truffle Cream Cheese Veggie Roll', description: 'Asparagus, avocado, cucumber, truffle cream cheese & edamame.', category: 'Signature Maki Rolls', price: 420, rating: 4.7, isVeg: true, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 380 }
          ]
        },
        {
          id: 'sushi-2',
          name: 'Fatty Bao Izakaya & Noodle Bar',
          cuisine: ['Asian Fusion', 'Sushi Rolls', 'Bao'],
          location: 'Indiranagar, Bengaluru',
          area: 'Indiranagar',
          distance: '1.1 km',
          rating: 4.8,
          ratingCount: '5.2k',
          venueType: 'RESTAURANT',
          moods: ['Social', 'Cozy'],
          isFamous: true,
          image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1200&q=80',
          bestPlatform: 'SWISH',
          startingFinalPrice: 395,
          menuCategories: ['Sushi Rolls', 'Asian Small Plates'],
          fullMenu: [
            { id: 'fb1', name: 'Spicy Tuna & Tobiko Roll', description: 'Ahi tuna tossed in spicy chili oil with masago caviar.', category: 'Sushi Rolls', price: 480, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 415 }
          ]
        }
      ]
    },
    ramen: {
      cuisine: 'Japanese Ramen',
      restaurants: [
        {
          id: 'ramen-1',
          name: 'Harima Japanese Noodle House',
          cuisine: ['Authentic Ramen', 'Japanese Izakaya'],
          location: 'MG Road / Residency Road, Bengaluru',
          area: 'MG Road / Church Street',
          distance: '1.9 km',
          rating: 4.9,
          ratingCount: '2.9k',
          venueType: 'RESTAURANT',
          moods: ['Cozy', 'Quiet'],
          isFamous: true,
          image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
          bestPlatform: 'Zomato',
          startingFinalPrice: 380,
          menuCategories: ['Authentic Broth Ramen', 'Gyoza Dumplings'],
          fullMenu: [
            { id: 'rm1', name: 'Tokyo Tonkotsu Chashu Ramen', description: '18-hour rich pork bone broth with hand-pulled noodles, soft-boiled egg & tender chashu.', category: 'Authentic Broth Ramen', price: 460, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Zomato', bestPrice: 395 },
            { id: 'rm2', name: 'Spicy Miso Chicken Ramen', description: 'Red miso broth infused with chili oil, minced chicken, bamboo shoots & nori.', category: 'Authentic Broth Ramen', price: 430, rating: 4.8, isVeg: false, image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Swiggy', bestPrice: 380 }
          ]
        }
      ]
    },
    jamun: {
      cuisine: 'Traditional Sweets & Desserts',
      restaurants: [
        {
          id: 'sweet-1',
          name: 'MTR 1924 Heritage Sweet House',
          cuisine: ['Authentic Sweets', 'Gulab Jamun', 'Desserts'],
          location: 'Lalbagh / MG Road, Bengaluru',
          area: 'MG Road / Church Street',
          distance: '2.1 km',
          rating: 4.9,
          ratingCount: '7.8k',
          venueType: 'RESTAURANT',
          moods: ['Cozy', 'Social'],
          isFamous: true,
          image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
          bestPlatform: 'Magicpin',
          startingFinalPrice: 85,
          menuCategories: ['Heritage Gulab Jamun', 'Traditional Desserts'],
          fullMenu: [
            { id: 'gj1', name: 'Pure Desi Ghee Gulab Jamun (2 Pcs)', description: 'Classic soft khoya jamun fried in pure cow ghee soaked in cardamom sugar syrup.', category: 'Heritage Gulab Jamun', price: 110, rating: 4.9, isVeg: true, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Magicpin', bestPrice: 85 },
            { id: 'gj2', name: 'Hot Gulab Jamun with Vanilla Ice Cream', description: 'Warm khoya jamun topped with a scoop of natural bean vanilla ice cream.', category: 'Heritage Gulab Jamun', price: 140, rating: 4.9, isVeg: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 115 }
          ]
        },
        {
          id: 'sweet-2',
          name: 'Corner House Legendary Desserts',
          cuisine: ['Sundiaes', 'Gulab Jamun DBC', 'Desserts'],
          location: 'Indiranagar, Bengaluru',
          area: 'Indiranagar',
          distance: '0.9 km',
          rating: 4.9,
          ratingCount: '14k',
          venueType: 'CAFE',
          moods: ['Cozy', 'Late Night'],
          isFamous: true,
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80',
          bestPlatform: 'SWISH',
          startingFinalPrice: 130,
          menuCategories: ['Jamun Sundaes', 'Ice Cream Treats'],
          fullMenu: [
            { id: 'ch-gj', name: 'Shahi Kala Jamun Sundae', description: 'Stuffed jumbo kala jamun with vanilla ice cream, hot chocolate fudge & cashews.', category: 'Jamun Sundaes', price: 160, rating: 4.9, isVeg: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80', bestPlatform: 'SWISH', bestPrice: 130 }
          ]
        }
      ]
    },
    tacos: {
      cuisine: 'Mexican & Street Tacos',
      restaurants: [
        {
          id: 'taco-1',
          name: 'Sanchez Mexican Cantina',
          cuisine: ['Authentic Mexican', 'Tacos', 'Burritos'],
          location: 'UB City, Bengaluru',
          area: 'UB City',
          distance: '1.9 km',
          rating: 4.8,
          ratingCount: '3.1k',
          venueType: 'RESTAURANT',
          moods: ['Social', 'Celebrate'],
          isFamous: true,
          image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
          bestPlatform: 'Swiggy',
          startingFinalPrice: 280,
          menuCategories: ['Street Tacos', 'Burritos'],
          fullMenu: [
            { id: 'tc1', name: 'Slow Braised Pork Birria Tacos (3 Pcs)', description: 'Corn tortillas stuffed with braised meat, melted cheese & dipping consommé broth.', category: 'Street Tacos', price: 340, rating: 4.9, isVeg: false, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', bestPlatform: 'Swiggy', bestPrice: 290 }
          ]
        }
      ]
    }
  };

  public static searchKnowledgeBase(query: string): DetailedRestaurant[] | null {
    const q = query.trim().toLowerCase();

    for (const [key, data] of Object.entries(this.DYNAMIC_KNOWLEDGE_BASE)) {
      if (q.includes(key) || key.includes(q)) {
        return data.restaurants as DetailedRestaurant[];
      }
    }
    return null;
  }
}
