import { AIRecommendation } from '../types';

export const PRESET_PROMPTS: string[] = [
  'Dinner for 2 under ₹800',
  'Aesthetic café near me',
  'Romantic rooftop place',
  'Best biryani deal tonight',
  'Quiet café to work for 3 hours'
];

export const AI_KNOWLEDGE_BASE: Record<string, { response: string; recommendations: AIRecommendation[] }> = {
  'dinner for 2 under ₹800': {
    response: "I've analyzed real-time line-item coupon stacks across platforms. Here are the top 2 high-value options under ₹800 total:",
    recommendations: [
      {
        id: 'biryani-house-regal',
        dishName: 'Royal Nizami Mutton Dum Biryani',
        reason: 'Order via Magicpin with code SUPERPIN60 to get a full feast for ₹234 (Save ₹186 vs Swiggy).',
        finalCost: 468,
        platform: 'Magicpin',
        savings: 186
      },
      {
        id: 'bastian-artisanal',
        dishName: 'Wild Mushroom Tagliatelle',
        reason: 'Order via Magicpin with SUPERPIN60 for ₹334 total.',
        finalCost: 668,
        platform: 'Magicpin',
        savings: 148
      }
    ]
  },
  'aesthetic café near me': {
    response: "Selected outposts with minimalist ceramics and sunlit courtyards:",
    recommendations: [
      {
        id: 'subko-craft-coffee',
        dishName: 'Single Origin Iced Latte & Cardamom Knot',
        reason: 'Swiggy offers code COFFEELOVER for ₹255 total in insulated thermal packaging.',
        finalCost: 255,
        platform: 'Swiggy',
        savings: 110
      }
    ]
  },
  'romantic rooftop place': {
    response: "Selected candlelit rooftop sanctuaries with panoramic skyline views:",
    recommendations: [
      {
        id: 'bastian-artisanal',
        dishName: 'Wild Mushroom & Truffle Tagliatelle',
        reason: 'Magicpin unlocks ₹186 flat discount + 45 Magic Coins cashback.',
        finalCost: 334,
        platform: 'Magicpin',
        savings: 186
      }
    ]
  }
};
