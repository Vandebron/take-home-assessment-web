import { describe, it, expect } from 'vitest';
import {
  calculateConsumption,
  getHouseTypeLabel,
  getProductLabel,
  getHouseTypeMultiplier,
  isValidResidentsCount,
} from './ConsumptionCalculator.service';

describe('ConsumptionCalculator.service', () => {
  describe('getHouseTypeLabel', () => {
    it('should return correct label for apartment', () => {
      expect(getHouseTypeLabel('apartment')).toBe('Appartement');
    });

    it('should return correct label for townhouse', () => {
      expect(getHouseTypeLabel('townhouse')).toBe('Tussenwoning');
    });

    it('should return the input for unknown house types', () => {
      expect(getHouseTypeLabel('unknown-type')).toBe('unknown-type');
    });
  });

  describe('getProductLabel', () => {
    it('should return correct label for electricity', () => {
      expect(getProductLabel('electricity')).toBe('Stroom');
    });

    it('should return correct label for electricity and gas', () => {
      expect(getProductLabel('electricity-gas')).toBe('Stroom en Gas');
    });

    it('should return the input for unknown product types', () => {
      expect(getProductLabel('unknown-product')).toBe('unknown-product');
    });
  });

  describe('getHouseTypeMultiplier', () => {
    it('should return 0.8 for apartment', () => {
      expect(getHouseTypeMultiplier('apartment')).toBe(0.8);
    });

    it('should return 1 for townhouse (baseline)', () => {
      expect(getHouseTypeMultiplier('townhouse')).toBe(1);
    });

    it('should return 1.4 for detached house', () => {
      expect(getHouseTypeMultiplier('detatched-house')).toBe(1.4);
    });

    it('should return default multiplier for unknown types', () => {
      expect(getHouseTypeMultiplier('unknown')).toBe(1);
    });
  });

  describe('calculateConsumption', () => {
    describe('electricity only', () => {
      it('should calculate electricity for 2 residents in apartment without solar panels', () => {
        const result = calculateConsumption('apartment', 2, 'electricity', false);
        // 600 kWh * 2 residents * 0.8 multiplier = 960 kWh
        expect(result.electricity).toBe(960);
        expect(result.gas).toBeUndefined();
      });

      it('should calculate electricity for 2 residents in apartment with solar panels', () => {
        const result = calculateConsumption('apartment', 2, 'electricity', true);
        // 600 kWh * 2 * 0.8 * 0.7 (30% reduction) = 672 kWh
        expect(result.electricity).toBe(672);
        expect(result.gas).toBeUndefined();
      });

      it('should calculate electricity for 5 residents in detached house', () => {
        const result = calculateConsumption('detatched-house', 5, 'electricity', false);
        // 600 kWh * 5 * 1.4 = 4200 kWh
        expect(result.electricity).toBe(4200);
      });
    });

    describe('electricity and gas', () => {
      it('should calculate both electricity and gas for 2 residents', () => {
        const result = calculateConsumption('townhouse', 2, 'electricity-gas', false);
        // Electricity: 600 * 2 * 1.0 = 1200 kWh
        // Gas: 500 * 2 * 1.0 = 1000 m³
        expect(result.electricity).toBe(1200);
        expect(result.gas).toBe(1000);
      });

      it('should reduce electricity but not gas when solar panels are present', () => {
        const result = calculateConsumption('townhouse', 2, 'electricity-gas', true);
        // Electricity: 600 * 2 * 1.0 * 0.7 = 840 kWh
        // Gas: 500 * 2 * 1.0 = 1000 m³ (unchanged)
        expect(result.electricity).toBe(840);
        expect(result.gas).toBe(1000);
      });

      it('should scale with number of residents', () => {
        const result = calculateConsumption('corner-house', 4, 'electricity-gas', false);
        // Electricity: 600 * 4 * 1.15 = 2760 kWh
        // Gas: 500 * 4 * 1.15 = 2300 m³
        expect(result.electricity).toBe(2760);
        expect(result.gas).toBe(2300);
      });
    });

    describe('edge cases', () => {
      it('should handle 1 resident', () => {
        const result = calculateConsumption('apartment', 1, 'electricity', false);
        expect(result.electricity).toBe(480); // 600 * 1 * 0.8
      });

      it('should handle maximum residents', () => {
        const result = calculateConsumption('apartment', 9, 'electricity', false);
        expect(result.electricity).toBe(4320); // 600 * 9 * 0.8
      });

      it('should round results to nearest integer', () => {
        const result = calculateConsumption('corner-house', 3, 'electricity', true);
        // 600 * 3 * 1.15 * 0.7 = 1449
        expect(result.electricity).toBe(1449);
        expect(Number.isInteger(result.electricity)).toBe(true);
      });
    });
  });

  describe('isValidResidentsCount', () => {
    it('should return true for valid count within range', () => {
      expect(isValidResidentsCount(5, 0, 10)).toBe(true);
    });

    it('should return false for count at minimum (exclusive)', () => {
      expect(isValidResidentsCount(0, 0, 10)).toBe(false);
    });

    it('should return false for count at maximum (exclusive)', () => {
      expect(isValidResidentsCount(10, 0, 10)).toBe(false);
    });

    it('should return false for count below minimum', () => {
      expect(isValidResidentsCount(-1, 0, 10)).toBe(false);
    });

    it('should return false for count above maximum', () => {
      expect(isValidResidentsCount(11, 0, 10)).toBe(false);
    });
  });
});
