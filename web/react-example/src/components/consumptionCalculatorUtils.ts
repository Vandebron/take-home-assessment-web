import type { HouseType, ProductType, ConsumptionResult } from './types';
  
  export const calculateConsumption = (
    houseType: HouseType,
    residents: number,
    product: ProductType,
    hasSolarPanels: boolean
  ): ConsumptionResult => {

    // Bigger or more isolated house types lead to increased consumption
    const houseTypeMultiplier: Record<string, number> = {
      'apartment': 1,
      'townhouse': 2,
      'corner-house': 3,
      'two-under-one-roof': 4,
      'detatched-house': 5
    };
  
    // Every additional resident increases consumption
    const residentMultiplier = 1 + ((residents - 1) * 0.2);
    
    const result: ConsumptionResult = {};
  
    // Calculate electricity
    if (product === 'electric' || product === 'electric-and-gas') {
      const baseElectricity = 100;
      let electricity = baseElectricity * (houseTypeMultiplier[houseType] || 1) * residentMultiplier;
      
      if (hasSolarPanels) {
        electricity *= 0.7;
      }
      
      result.electricity = Math.round(electricity);
    }
  
    // Calculate gas
    if (product === 'electric-and-gas') {
      const baseGas = 20;
      const gas = baseGas * (houseTypeMultiplier[houseType] || 1) * residentMultiplier;
      result.gas = Math.round(gas);
    }
  
    return result;
  }