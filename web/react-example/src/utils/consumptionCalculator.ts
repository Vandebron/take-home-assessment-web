type HouseType = 'apartment' | 'townhouse' | 'corner-house' | 'two-under-one-roof' | 'detatched-house';

interface ConsumptionParams {
  houseType: HouseType;
  residents: number;
  hasSolarPanels: boolean;
}

// Base consumption values in kWh per year
const BASE_CONSUMPTION = 2000;
const RESIDENT_CONSUMPTION = 1200; // Additional consumption per resident
const HOUSE_TYPE_MULTIPLIERS: Record<HouseType, number> = {
  'apartment': 1.0,
  'townhouse': 1.2,
  'corner-house': 1.3,
  'two-under-one-roof': 1.4,
  'detatched-house': 1.5
};
const SOLAR_PANEL_REDUCTION = 0.3; // 30% reduction with solar panels

export function calculateConsumption({ houseType, residents, hasSolarPanels }: ConsumptionParams): { electricity: number } {
  // Calculate base consumption with house type multiplier
  let consumption = BASE_CONSUMPTION * HOUSE_TYPE_MULTIPLIERS[houseType];
  
  // Add consumption for each resident
  consumption += residents * RESIDENT_CONSUMPTION;
  
  // Apply solar panel reduction if applicable
  if (hasSolarPanels) {
    consumption *= (1 - SOLAR_PANEL_REDUCTION);
  }
  
  // Round to nearest whole number
  return {
    electricity: Math.round(consumption)
  };
}
