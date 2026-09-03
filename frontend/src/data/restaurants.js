export const RESTAURANTS = [
  {
    id: 'bastian-artisanal',
    name: 'Bastian & Co.',
    tagline: 'Artisanal Seafood, Handcrafted Tagliatelle & Sunset Skylines',
    cuisine: ['Continental', 'Seafood', 'Italian'],
    rating: 4.9,
    ratingCount: '1.4k',
    deliveryTime: '24 mins',
    priceForTwo: '₹1,200',
    moods: ['aesthetic', 'romantic', 'rooftop-evenings'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    location: 'Indiranagar, Bangalore',
    bestOffer: 'SAVE FLAT ₹186 ON ZOMATO GOLD',
    dishes: [
      {
        id: 'bastian-truffle-pasta',
        name: 'Wild Mushroom & Truffle Tagliatelle',
        description: 'Handcrafted fresh egg pasta, black summer truffle cream, wild porcini mushrooms, aged parmesan wheel crisp.',
        category: 'Main Course',
        basePrice: 580,
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281358?auto=format&fit=crop&w=800&q=80',
        dna: {
          spiceLevel: 1,
          spiceLabel: 'Mild & Creamy',
          portionSize: 'Generous (Serves 2)',
          valueForMoney: 94,
          popularity: 98,
          deliveryReliability: 99
        },
        comparison: [
          {
            platformId: 'swiggy',
            platformName: 'Swiggy',
            logo: '🟠',
            itemPrice: 580,
            deliveryFee: 45,
            platformFee: 7,
            couponName: 'SWIGGYIT50',
            couponDiscount: 150,
            finalPrice: 482,
            stamp: 'STANDARD'
          },
          {
            platformId: 'zomato',
            platformName: 'Zomato',
            logo: '🔴',
            itemPrice: 580,
            deliveryFee: 35,
            platformFee: 6,
            couponName: 'ZOMGOLD50',
            couponDiscount: 180,
            finalPrice: 441,
            isCheapest: true,
            stamp: 'BEST VALUE'
          },
          {
            platformId: 'swish',
            platformName: 'Swish',
            logo: '⚡',
            itemPrice: 580,
            deliveryFee: 20,
            platformFee: 5,
            couponName: 'SWISHFAST100',
            couponDiscount: 140,
            finalPrice: 465,
            stamp: '10 MIN EXPRESS'
          },
          {
            platformId: 'eatsure',
            platformName: 'EatSure',
            logo: '🛡️',
            itemPrice: 580,
            deliveryFee: 0,
            platformFee: 0,
            couponName: 'SUREPASS',
            couponDiscount: 110,
            finalPrice: 470,
            stamp: 'ZERO FEE'
          },
          {
            platformId: 'magicpin',
            platformName: 'Magicpin',
            logo: '🟣',
            itemPrice: 580,
            deliveryFee: 40,
            platformFee: 5,
            couponName: 'MAGICMAGIC',
            couponDiscount: 120,
            finalPrice: 505,
            stamp: 'CASHBACK'
          }
        ]
      }
    ],
    offerTimeline: [
      { timeSlot: '8 AM - 11 AM', title: 'Morning Ritual', discount: '20% OFF', platform: 'Swiggy' },
      { timeSlot: '12 PM - 3 PM', title: 'Power Lunch', discount: '40% OFF', platform: 'Zomato' },
      { timeSlot: '5 PM - 8 PM', title: 'Golden Hour', discount: '55% OFF', platform: 'Zomato', peakHours: true },
      { timeSlot: '10 PM - 2 AM', title: 'Midnight Starlight', discount: '35% OFF', platform: 'Magicpin' }
    ]
  },
  {
    id: 'biryani-house-regal',
    name: 'Charminar Regal Biryani',
    tagline: 'Saffron-infused Dum Biryanis & Slow-cooked Haleem',
    cuisine: ['Hyderabadi', 'Biryani', 'Mughlai'],
    rating: 4.8,
    ratingCount: '3.2k',
    deliveryTime: '28 mins',
    priceForTwo: '₹650',
    moods: ['family-gatherings', 'late-night', 'budget-feasts'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    location: 'Koramangala, Bangalore',
    bestOffer: 'MAGICPIN 60% SURGE: SAVE ₹186',
    dishes: [
      {
        id: 'regal-mutton-biryani',
        name: 'Royal Nizami Mutton Dum Biryani',
        description: 'Aged Long-grain Basmati rice layered with tender mutton chunks, organic Kashmiri saffron, fried golden onions & ghee.',
        category: 'Main Course',
        basePrice: 420,
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
        dna: {
          spiceLevel: 4,
          spiceLabel: 'Aromatic & Fiery',
          portionSize: 'Feast (Serves 2-3)',
          valueForMoney: 98,
          popularity: 99,
          deliveryReliability: 96
        },
        comparison: [
          {
            platformId: 'swiggy',
            platformName: 'Swiggy',
            logo: '🟠',
            itemPrice: 420,
            deliveryFee: 35,
            platformFee: 6,
            couponName: 'SWIGGYWEEKEND',
            couponDiscount: 100,
            finalPrice: 361,
            stamp: 'STANDARD'
          },
          {
            platformId: 'zomato',
            platformName: 'Zomato',
            logo: '🔴',
            itemPrice: 420,
            deliveryFee: 30,
            platformFee: 5,
            couponName: 'CRAVINGZOM',
            couponDiscount: 120,
            finalPrice: 335,
            stamp: 'POPULAR'
          },
          {
            platformId: 'magicpin',
            platformName: 'Magicpin',
            logo: '🟣',
            itemPrice: 420,
            deliveryFee: 25,
            platformFee: 4,
            couponName: 'SUPERPIN50',
            couponDiscount: 180,
            finalPrice: 269,
            isCheapest: true,
            stamp: 'CHAMPION DEAL'
          },
          {
            platformId: 'eatsure',
            platformName: 'EatSure',
            logo: '🛡️',
            itemPrice: 420,
            deliveryFee: 0,
            platformFee: 0,
            couponName: 'EATSAFE',
            couponDiscount: 90,
            finalPrice: 330,
            stamp: 'ZERO SURGE'
          },
          {
            platformId: 'swish',
            platformName: 'Swish',
            logo: '⚡',
            itemPrice: 420,
            deliveryFee: 25,
            platformFee: 5,
            couponName: 'SWISHFOOD',
            couponDiscount: 110,
            finalPrice: 340,
            stamp: 'EXPRESS'
          }
        ]
      }
    ],
    offerTimeline: [
      { timeSlot: '8 AM - 11 AM', title: 'Morning Pot', discount: '15% OFF', platform: 'Swiggy' },
      { timeSlot: '12 PM - 3 PM', title: 'Lunch Feast', discount: '30% OFF', platform: 'Zomato' },
      { timeSlot: '5 PM - 8 PM', title: 'Family Dinner', discount: '40% OFF', platform: 'Magicpin' },
      { timeSlot: '10 PM - 2 AM', title: 'Midnight Dum', discount: '60% OFF', platform: 'Magicpin', peakHours: true }
    ]
  },
  {
    id: 'subko-craft-coffee',
    name: 'Subko Craft Coffee & Bakehouse',
    tagline: 'Single-origin Pour Overs, Cardamom Knots & Mindful Nooks',
    cuisine: ['Coffee', 'Bakery', 'Breakfast'],
    rating: 4.9,
    ratingCount: '980',
    deliveryTime: '18 mins',
    priceForTwo: '₹500',
    moods: ['work-coffee', 'breakfast-ritual', 'aesthetic'],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    location: 'Church Street, Bangalore',
    bestOffer: 'SWIGGY ONE: FREE THERMAL DELIVERY + ₹110 OFF',
    dishes: [
      {
        id: 'subko-flat-white',
        name: 'Single Origin Iced Latte & Cardamom Knot',
        description: 'Double shot specialty espresso extracted over oat milk paired with warm house-made Scandinavian cardamom knot pastry.',
        category: 'Beverages & Bakery',
        basePrice: 340,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
        dna: {
          spiceLevel: 1,
          spiceLabel: 'Velvety Sweet',
          portionSize: 'Single Brew + Bakery',
          valueForMoney: 91,
          popularity: 97,
          deliveryReliability: 99
        },
        comparison: [
          {
            platformId: 'swiggy',
            platformName: 'Swiggy',
            logo: '🟠',
            itemPrice: 340,
            deliveryFee: 20,
            platformFee: 5,
            couponName: 'COFFEELOVER',
            couponDiscount: 110,
            finalPrice: 255,
            isCheapest: true,
            stamp: 'BEST VALUE'
          },
          {
            platformId: 'swish',
            platformName: 'Swish',
            logo: '⚡',
            itemPrice: 340,
            deliveryFee: 15,
            platformFee: 5,
            couponName: 'SWISHBEANS',
            couponDiscount: 90,
            finalPrice: 270,
            stamp: 'LIGHTNING 10M'
          },
          {
            platformId: 'zomato',
            platformName: 'Zomato',
            logo: '🔴',
            itemPrice: 340,
            deliveryFee: 25,
            platformFee: 6,
            couponName: 'ZOMCAFE',
            couponDiscount: 80,
            finalPrice: 291,
            stamp: 'GOLD DEAL'
          },
          {
            platformId: 'magicpin',
            platformName: 'Magicpin',
            logo: '🟣',
            itemPrice: 340,
            deliveryFee: 30,
            platformFee: 4,
            couponName: 'MAGICBEANS',
            couponDiscount: 70,
            finalPrice: 304,
            stamp: 'COINS'
          }
        ]
      }
    ],
    offerTimeline: [
      { timeSlot: '8 AM - 11 AM', title: 'Morning Boost', discount: '45% OFF', platform: 'Swiggy', peakHours: true },
      { timeSlot: '12 PM - 3 PM', title: 'Midday Brew', discount: '25% OFF', platform: 'Zomato' },
      { timeSlot: '5 PM - 8 PM', title: 'Evening Work', discount: '30% OFF', platform: 'Swiggy' },
      { timeSlot: '10 PM - 2 AM', title: 'Late Espresso', discount: '20% OFF', platform: 'Magicpin' }
    ]
  },
  {
    id: 'zen-noodle-bar',
    name: 'Zen Noodle Bar & Izakaya',
    tagline: 'Slow-simmered Tonkotsu Ramen, Gyoza & Calm Atmosphere',
    cuisine: ['Japanese', 'Ramen', 'Asian'],
    rating: 4.7,
    ratingCount: '1.1k',
    deliveryTime: '30 mins',
    priceForTwo: '₹900',
    moods: ['calm-corners', 'hidden-gems', 'aesthetic'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    location: 'Lavelle Road, Bangalore',
    bestOffer: 'FLAT ₹140 OFF ON ZOMATO GOLD',
    dishes: [
      {
        id: 'zen-black-garlic-ramen',
        name: 'Black Garlic Tonkotsu Ramen',
        description: '18-hour rich pork bone broth with black garlic oil, ajitsuke tamago egg, tender chashu pork belly, and thin wheat noodles.',
        category: 'Ramen',
        basePrice: 520,
        image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=800&q=80',
        dna: {
          spiceLevel: 3,
          spiceLabel: 'Savory Umami',
          portionSize: 'Hearty Bowl (Serves 1)',
          valueForMoney: 93,
          popularity: 95,
          deliveryReliability: 98
        },
        comparison: [
          {
            platformId: 'zomato',
            platformName: 'Zomato',
            logo: '🔴',
            itemPrice: 520,
            deliveryFee: 30,
            platformFee: 5,
            couponName: 'ZOMATOGOLD',
            couponDiscount: 140,
            finalPrice: 415,
            isCheapest: true,
            stamp: 'BEST VALUE'
          },
          {
            platformId: 'eatsure',
            platformName: 'EatSure',
            logo: '🛡️',
            itemPrice: 520,
            deliveryFee: 0,
            platformFee: 0,
            couponName: 'SUREJAPAN',
            couponDiscount: 80,
            finalPrice: 440,
            stamp: 'HYGIENE SEAL'
          },
          {
            platformId: 'swiggy',
            platformName: 'Swiggy',
            logo: '🟠',
            itemPrice: 520,
            deliveryFee: 40,
            platformFee: 6,
            couponName: 'SWIGRAMEN',
            couponDiscount: 100,
            finalPrice: 466,
            stamp: 'STANDARD'
          },
          {
            platformId: 'magicpin',
            platformName: 'Magicpin',
            logo: '🟣',
            itemPrice: 520,
            deliveryFee: 35,
            platformFee: 4,
            couponName: 'MAGICJAPAN',
            couponDiscount: 90,
            finalPrice: 469,
            stamp: 'REWARD'
          }
        ]
      }
    ],
    offerTimeline: [
      { timeSlot: '8 AM - 11 AM', title: 'Closed', discount: '0%', platform: 'None' },
      { timeSlot: '12 PM - 3 PM', title: 'Bento Lunch', discount: '35% OFF', platform: 'Swiggy' },
      { timeSlot: '5 PM - 8 PM', title: 'Izakaya Hours', discount: '50% OFF', platform: 'Zomato', peakHours: true },
      { timeSlot: '10 PM - 2 AM', title: 'Late Ramen', discount: '30% OFF', platform: 'Magicpin' }
    ]
  }
];
