import { PriceHistoryPoint, Timeframe } from '../types';

export const PRICE_HISTORY_DATA: Record<Timeframe, PriceHistoryPoint[]> = {
  '24H': [
    { label: '8 AM', price: 391, platform: 'Swiggy', offer: 'Standard' },
    { label: '12 PM', price: 365, platform: 'Zomato', offer: 'Lunch Pass' },
    { label: '4 PM', price: 348, platform: 'Magicpin', offer: 'Tea Time' },
    { label: '8 PM', price: 307, platform: 'Magicpin', offer: 'Dinner Surge 60%' }
  ],
  '7D': [
    { label: 'Mon', price: 391, platform: 'Swiggy', offer: 'Standard' },
    { label: 'Wed', price: 362, platform: 'Zomato', offer: 'Midweek Offer' },
    { label: 'Fri', price: 348, platform: 'Magicpin', offer: 'Weekend Pass' },
    { label: 'Today', price: 307, platform: 'Magicpin', offer: 'SuperPin 60%' }
  ],
  '30D': [
    { label: '30 Days Ago', price: 410, platform: 'Uber Eats', offer: 'No Offer' },
    { label: '20 Days Ago', price: 380, platform: 'EatSure', offer: 'Free Delivery' },
    { label: '10 Days Ago', price: 345, platform: 'Zomato', offer: 'Gold Surge' },
    { label: 'Today', price: 307, platform: 'Magicpin', offer: 'SuperPin 60%' }
  ],
  '3M': [
    { label: '3 Mths Ago', price: 425, platform: 'Swiggy', offer: 'Standard' },
    { label: '2 Mths Ago', price: 395, platform: 'Zomato', offer: 'Pro' },
    { label: '1 Mth Ago', price: 340, platform: 'Magicpin', offer: 'Coins' },
    { label: 'Today', price: 307, platform: 'Magicpin', offer: 'SuperPin 60%' }
  ]
};
