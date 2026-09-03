export const PRESET_PROMPTS = [
  'Dinner for 2 under ₹800',
  'Aesthetic café near me',
  'Romantic rooftop place',
  'Best biryani deal tonight',
  'Quiet café to work for 3 hours'
];

export const AI_KNOWLEDGE_BASE = {
  'dinner for 2 under ₹800': {
    response: "I've analyzed real-time coupon stacks across platforms. Here are the top 2 high-value dining options under ₹800 total for two:",
    recommendations: [
      {
        id: 'biryani-house-regal',
        dishName: 'Royal Nizami Mutton Dum Biryani',
        reason: 'Order via Magicpin with code SUPERPIN50 to get a full feast for ₹269 (Save ₹151 vs Swiggy).',
        finalCost: 538,
        platform: 'Magicpin',
        savings: 186
      },
      {
        id: 'taco-loco-street',
        dishName: 'Quesabirria Tacos + Consomé',
        reason: 'Order via Magicpin using MAGICTACO150 to lock in ₹254 per order.',
        finalCost: 508,
        platform: 'Magicpin',
        savings: 150
      }
    ]
  },
  'aesthetic café near me': {
    response: "Found stunning aesthetic outposts with minimalist ceramics and sunlit corners. Recommended for design lovers:",
    recommendations: [
      {
        id: 'subko-craft-coffee',
        dishName: 'Single Origin Iced Latte & Cardamom Knot',
        reason: 'Swiggy offers code COFFEELOVER for ₹255 total delivered in insulated thermal packaging.',
        finalCost: 255,
        platform: 'Swiggy',
        savings: 110
      },
      {
        id: 'bastian-artisanal',
        dishName: 'Wild Mushroom Tagliatelle',
        reason: 'Zomato Gold provides priority kitchen dispatch + ₹180 discount.',
        finalCost: 441,
        platform: 'Zomato',
        savings: 180
      }
    ]
  },
  'romantic rooftop place': {
    response: "Selected candlelit rooftop sanctuaries with panoramic skyline views & curated wine selections:",
    recommendations: [
      {
        id: 'la-piazza-woodfired',
        dishName: 'Truffle Burrata & Prosciutto Pizza',
        reason: 'Zomato Pro unlocks ₹165 flat discount + free garlic dip (Final bill ₹520).',
        finalCost: 520,
        platform: 'Zomato',
        savings: 165
      },
      {
        id: 'bastian-artisanal',
        dishName: 'Butter-Poached Lobster Brioche Roll',
        reason: 'Order via Zomato Gold for ₹586 total (save ₹69 compared to Magicpin).',
        finalCost: 586,
        platform: 'Zomato',
        savings: 134
      }
    ]
  },
  'best biryani deal tonight': {
    response: "Analyzing biryani dumpots across Koramangala & Indiranagar... Magicpin currently wins with a 60% discount surge!",
    recommendations: [
      {
        id: 'biryani-house-regal',
        dishName: 'Royal Nizami Mutton Dum Biryani',
        reason: 'Magicpin code SUPERPIN50 gives ₹180 off + 45 Magic Coins cashback.',
        finalCost: 269,
        platform: 'Magicpin',
        savings: 186
      }
    ]
  },
  'quiet café to work for 3 hours': {
    response: "Filtered for places with 100+ Mbps Wi-Fi, abundant outlets, soft acoustic jazz & specialty pour-overs:",
    recommendations: [
      {
        id: 'subko-craft-coffee',
        dishName: 'Cold Brew & Almond Croissant',
        reason: 'Swiggy gives ₹110 off using COFFEELOVER.',
        finalCost: 255,
        platform: 'Swiggy',
        savings: 110
      }
    ]
  }
};
