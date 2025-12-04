/**
 * Constants for consumption calculation
 * Based on average household energy usage
 */
export const CONSUMPTION_CONSTANTS = {
  BASE_ELECTRICITY_PER_PERSON: 600, // kWh per year per person
  BASE_GAS_PER_PERSON: 500, // m³ per year per person
  SOLAR_PANEL_REDUCTION: 0.3, // 30% reduction in electricity consumption
} as const;

/**
 * Multipliers based on house type
 * Larger houses consume more energy due to increased space to heat/cool
 */
export const HOUSE_TYPE_MULTIPLIERS: Record<string, number> = {
  apartment: 0.8, // Smallest, shared walls
  townhouse: 1, // Baseline
  'corner-house': 1.15, // One exposed side
  'two-under-one-roof': 1.25, // Semi-detached
  'detatched-house': 1.4, // Largest, all sides exposed
} as const;

/**
 * Display labels for house types
 */
export const HOUSE_TYPE_LABELS: Record<string, string> = {
  apartment: 'Appartement',
  townhouse: 'Tussenwoning',
  'corner-house': 'Hoekwoning',
  'two-under-one-roof': '2 onder 1 Kap',
  'detatched-house': 'Vrijstaand',
} as const;

/**
 * Display labels for product types
 */
export const PRODUCT_LABELS: Record<string, string> = {
  electricity: 'Stroom',
  'electricity-gas': 'Stroom en Gas',
} as const;

/**
 * Default multiplier when house type is unknown
 */
export const DEFAULT_MULTIPLIER = 1;

/**
 * Maximum number of residents allowed in the calculator
 */
export const MAX_RESIDENTS = 9;

/**
 * Minimum number of residents allowed in the calculator
 */
export const MIN_RESIDENTS = 1;
