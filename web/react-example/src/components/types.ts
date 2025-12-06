export const HOUSE_TYPES = {
    APARTMENT: 'apartment',
    TOWNHOUSE: 'townhouse',
    CORNER_HOUSE: 'corner-house',
    TWO_UNDER_ONE_ROOF: 'two-under-one-roof',
    DETACHED_HOUSE: 'detached-house',
  } as const;
  
export type HouseType = typeof HOUSE_TYPES[keyof typeof HOUSE_TYPES];