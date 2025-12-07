export const HOUSE_TYPES = {
    APARTMENT: 'apartment',
    TOWNHOUSE: 'townhouse',
    CORNER_HOUSE: 'corner-house',
    TWO_UNDER_ONE_ROOF: 'two-under-one-roof',
    DETACHED_HOUSE: 'detached-house',
  } as const;
  
export type HouseType = typeof HOUSE_TYPES[keyof typeof HOUSE_TYPES];

export const PRODUCT_TYPES = {
    ELECTRIC: 'electric',
    ELECTRIC_AND_GAS: 'electric-and-gas'
  } as const;

export type ProductType = typeof PRODUCT_TYPES[keyof typeof PRODUCT_TYPES];