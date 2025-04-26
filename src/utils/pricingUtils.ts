
export type CakeSize = '6-inch' | '8-inch' | '10-inch';

export interface PricingOptions {
  size: CakeSize;
  isCustomDesign?: boolean;
  isRushOrder?: boolean;
}

const BASE_PRICES: Record<CakeSize, number> = {
  '6-inch': 75,
  '8-inch': 120,
  '10-inch': 180,
};

const CUSTOM_DESIGN_MULTIPLIER = 1.25; // +25%
const RUSH_ORDER_MULTIPLIER = 1.30;    // +30%

export const calculateCakePrice = ({ size, isCustomDesign = false, isRushOrder = false }: PricingOptions): number => {
  let finalPrice = BASE_PRICES[size];

  if (isCustomDesign) {
    finalPrice *= CUSTOM_DESIGN_MULTIPLIER;
  }
  
  if (isRushOrder) {
    finalPrice *= RUSH_ORDER_MULTIPLIER;
  }

  return Number(finalPrice.toFixed(2));
};

export const getBasePriceForSize = (size: CakeSize): number => BASE_PRICES[size];

