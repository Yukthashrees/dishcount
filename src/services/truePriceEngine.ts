import { PlatformPriceBreakdown } from '../types';

export class TruePriceEngine {
  /**
   * Calculates the exact final payable price for a platform breakdown
   */
  public static calculateFinalPrice(item: PlatformPriceBreakdown): number {
    const totalAdditions = item.basePrice + item.deliveryFee + item.platformFee + item.taxes + item.packagingFee;
    const totalDeductions = item.restaurantDiscount + item.couponDiscount + item.cashback;
    return Math.max(0, totalAdditions - totalDeductions);
  }

  /**
   * Sorts platforms based on user choice mode (CHEAPEST, FASTEST, BEST VALUE)
   */
  public static sortPlatforms(
    platforms: PlatformPriceBreakdown[],
    mode: 'CHEAPEST' | 'FASTEST' | 'BEST VALUE'
  ): PlatformPriceBreakdown[] {
    const list = [...platforms];
    if (mode === 'CHEAPEST') {
      return list.sort((a, b) => a.finalPayablePrice - b.finalPayablePrice);
    } else if (mode === 'FASTEST') {
      return list.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
    } else {
      // BEST VALUE (highest dealScore)
      return list.sort((a, b) => b.dealScore - a.dealScore);
    }
  }

  /**
   * Calculates total savings compared to the most expensive option
   */
  public static calculateMaxSavings(platforms: PlatformPriceBreakdown[]): {
    cheapest: PlatformPriceBreakdown;
    mostExpensive: PlatformPriceBreakdown;
    savings: number;
  } {
    const sorted = [...platforms].sort((a, b) => a.finalPayablePrice - b.finalPayablePrice);
    const cheapest = sorted[0];
    const mostExpensive = sorted[sorted.length - 1];
    const savings = Math.max(0, mostExpensive.finalPayablePrice - cheapest.finalPayablePrice);
    return { cheapest, mostExpensive, savings };
  }
}
