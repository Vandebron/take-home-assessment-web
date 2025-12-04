import {
  CONSUMPTION_CONSTANTS,
  HOUSE_TYPE_MULTIPLIERS,
  HOUSE_TYPE_LABELS,
  PRODUCT_LABELS,
  DEFAULT_MULTIPLIER,
} from '../constants';

/**
 * Consumption result type
 */
export type ConsumptionResult = {
  electricity: number;
  gas?: number;
};

/**
 * Gets the display label for a house type
 * @param type - House type ID
 * @returns Display label or the type ID if not found
 */
export const getHouseTypeLabel = (type: string): string => {
  return HOUSE_TYPE_LABELS[type] || type;
};

/**
 * Gets the display label for a product type
 * @param productType - Product type ID
 * @returns Display label or the product type ID if not found
 */
export const getProductLabel = (productType: string): string => {
  return PRODUCT_LABELS[productType] || productType;
};

/**
 * Gets the consumption multiplier for a house type
 * @param houseType - House type ID
 * @returns Multiplier value or default if not found
 */
export const getHouseTypeMultiplier = (houseType: string): number => {
  return HOUSE_TYPE_MULTIPLIERS[houseType] || DEFAULT_MULTIPLIER;
};

/**
 * Calculates estimated annual energy consumption
 *
 * @param houseType - Type of house (affects base consumption)
 * @param residents - Number of people living in the house
 * @param product - Energy product type (electricity only or with gas)
 * @param hasSolarPanels - Whether the house has solar panels (reduces electricity)
 * @returns Object with electricity consumption in kWh and optional gas in m³
 */
export const calculateConsumption = (
  houseType: string,
  residents: number,
  product: string,
  hasSolarPanels: boolean
): ConsumptionResult => {
  const houseMultiplier = getHouseTypeMultiplier(houseType);

  // Solar panels reduce electricity consumption by 30%
  const solarPanelMultiplier = hasSolarPanels
    ? 1 - CONSUMPTION_CONSTANTS.SOLAR_PANEL_REDUCTION
    : 1.0;

  // Calculate electricity consumption in kWh per year
  const electricity = Math.round(
    CONSUMPTION_CONSTANTS.BASE_ELECTRICITY_PER_PERSON *
      residents *
      houseMultiplier *
      solarPanelMultiplier
  );

  const result: ConsumptionResult = { electricity };

  // Add gas consumption if product includes gas
  if (product === 'electricity-gas') {
    result.gas = Math.round(
      CONSUMPTION_CONSTANTS.BASE_GAS_PER_PERSON * residents * houseMultiplier
    );
  }

  return result;
};

/**
 * Validates if a number of residents is within acceptable range
 * @param residents - Number to validate
 * @param min - Minimum acceptable value (inclusive)
 * @param max - Maximum acceptable value (exclusive)
 * @returns true if valid, false otherwise
 */
export const isValidResidentsCount = (residents: number, min: number, max: number): boolean => {
  return residents > min && residents < max;
};
