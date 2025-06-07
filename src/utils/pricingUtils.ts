export type CakeSize = '5-inch' | '6-inch' | '7-inch' | '8-inch' | '9-inch' | '10-inch' | '11-inch' | '12-inch';
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
  '5-inch': 60,
  '6-inch': 75,
  '7-inch': 95,
  '8-inch': 120,
  '9-inch': 150,
  '10-inch': 180,
  '11-inch': 215,
  '12-inch': 255,
};

const CUSTOM_DESIGN_MULTIPLIER = 1.25; // +25%
const RUSH_ORDER_MULTIPLIER = 1.30;    // +30%
const MULTIPLE_FLAVORS_MULTIPLIER = 1.25; // +25%

// Minimum delivery days from current date
const MINIMUM_DELIVERY_DAYS: Record<CakeType, number> = {
  'birthday': 5,
  'anniversary': 5,
  'custom': 5,
  'wedding': 14, // 2 weeks
};

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
    case 'custom':
      return daysDifference < 14; // 2 weeks
    case 'wedding':
      return daysDifference < 28; // 4 weeks
    default:
      return daysDifference < 14; // 2 weeks
  }
};

export const getMinimumDeliveryDate = (cakeType: CakeType, currentDate: Date = new Date()): Date => {
  const minDays = MINIMUM_DELIVERY_DAYS[cakeType];
  const minDate = new Date(currentDate);
  minDate.setDate(currentDate.getDate() + minDays);
  return minDate;
};

export const isValidDeliveryDate = (cakeType: CakeType, deliveryDate: Date, currentDate: Date = new Date()): boolean => {
  const minDate = getMinimumDeliveryDate(cakeType, currentDate);
  return deliveryDate >= minDate;
};
