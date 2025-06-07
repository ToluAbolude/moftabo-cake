
export type CakeSize = '6-inch' | '8-inch' | '10-inch';
export type CakeType = 'birthday' | 'anniversary' | 'wedding' | 'custom';

export interface PricingOptions {
  size: CakeSize;
  isCustomDesign?: boolean;
  isRushOrder?: boolean;
  isMultipleFlavors?: boolean;
}

export interface RushOrderOptions {
  cakeType: CakeType;
  deliveryDate: Date;
  currentDate?: Date;
}

const BASE_PRICES: Record<CakeSize, number> = {
  '6-inch': 75,
  '8-inch': 120,
  '10-inch': 180,
};

const CUSTOM_DESIGN_MULTIPLIER = 1.25; // +25%
const RUSH_ORDER_MULTIPLIER = 1.30;    // +30%
const MULTIPLE_FLAVORS_MULTIPLIER = 1.25; // +25%

export const calculateCakePrice = ({ size, isCustomDesign = false, isRushOrder = false, isMultipleFlavors = false }: PricingOptions): number => {
  let finalPrice = BASE_PRICES[size];

  if (isCustomDesign) {
    finalPrice *= CUSTOM_DESIGN_MULTIPLIER;
  }
  
  if (isMultipleFlavors) {
    finalPrice *= MULTIPLE_FLAVORS_MULTIPLIER;
  }
  
  if (isRushOrder) {
    finalPrice *= RUSH_ORDER_MULTIPLIER;
  }

  return Number(finalPrice.toFixed(2));
};

export const getBasePriceForSize = (size: CakeSize): number => BASE_PRICES[size];

export const isRushOrder = ({ cakeType, deliveryDate, currentDate = new Date() }: RushOrderOptions): boolean => {
  const daysDifference = Math.ceil(
    (deliveryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  switch (cakeType) {
    case 'birthday':
    case 'anniversary':
      return daysDifference < 14; // 2 weeks
    case 'wedding':
      return daysDifference < 28; // 4 weeks
    case 'custom':
    default:
      return daysDifference < 14; // 2 weeks
  }
};
