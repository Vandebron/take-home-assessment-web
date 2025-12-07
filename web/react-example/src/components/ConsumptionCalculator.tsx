import { useState, useEffect } from 'react';
import { calculateConsumption } from './consumptionCalculatorUtils';
import { HOUSE_TYPES, PRODUCT_TYPES } from './types';
import type { ProductType } from './types';
import HouseTypeSelector from './HouseTypeSelector';
import ResidentsSelector from './ResidentsSelector';
import ProductSelector from './ProductSelector';
import { getHouseTypeLabel } from './HouseTypeSelector.service';
import { SolarPanel } from './icons';
import styles from './ConsumptionCalculator.module.css';

const PRODUCT_LABELS: Record<ProductType, string> = {
  [PRODUCT_TYPES.ELECTRIC]: 'Stroom',
  [PRODUCT_TYPES.ELECTRIC_AND_GAS]: 'Stroom & Gas',
};

const getProductLabel = (product: ProductType): string => {
  return PRODUCT_LABELS[product] || product;
};

interface ConsumptionResult {
  electricity: number;
  gas?: number;
}

export default function ConsumptionCalculator() {
  
  const [houseType, setHouseType] = useState(HOUSE_TYPES.APARTMENT);
  const [residents, setResidents] = useState(1);
  const [product, setProduct] = useState<ProductType>(PRODUCT_TYPES.ELECTRIC);
  const [hasSolarPanels, setHasSolarPanels] = useState(false);
  const [consumption, setConsumption] = useState<ConsumptionResult>({});

  useEffect(() => {
    const result = calculateConsumption(houseType, residents, product, hasSolarPanels);
    setConsumption(result);
  }, [houseType, residents, product, hasSolarPanels]);

  const handleResidentsSelectorChange = (residents: number) => {
    if (residents >= 1 && residents <= 5) {
      setResidents(residents);
    }
  };

  const hasResults = consumption.electricity !== undefined || consumption.gas !== undefined;

  const renderConsumptionResult = (
    type: 'electricity' | 'gas',
    value: number | undefined,
    unit: string
  ) => {
    if (value === undefined) return null;
    
    const label = type === 'electricity' ? 'Stroom' : 'Gas';
    return (
      <p className={styles.resultItem}>
        <span className={styles.resultLabel}>{label}:</span>
        <strong className={styles.resultValue}>{value} {unit}</strong>
      </p>
    );
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Verbruik berekenen</h2>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.section}>
            <p className={styles.label}>
              Type woning: {getHouseTypeLabel(houseType)}
            </p>
            <HouseTypeSelector value={houseType} onChange={setHouseType} />
          </div>
          <div className={styles.section}>
            <p className={styles.label}>Aantal bewoners: {residents}</p>
            <ResidentsSelector value={residents} onChange={handleResidentsSelectorChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.section}>
            <p className={styles.label}>Product: {getProductLabel(product)}</p>
            <ProductSelector value={product} onChange={setProduct} />
          </div>
          <div className={styles.section}>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="solarPanels"
                checked={hasSolarPanels}
                onChange={(e) => setHasSolarPanels(e.target.checked)}
              />
              <SolarPanel />
              <label htmlFor="solarPanels">
                <span>Zonnepanelen</span>
                <span className={styles.infoIcon} title="Zonnepanelen verlagen het stroomverbruik met 30%">ⓘ</span>
              </label>
            </div>
          </div>
        </div>

        {/* Consumption Results */}
        {hasResults && (
          <div className={styles.results}>
            <h3 className={styles.resultsTitle}>Geschat jaarverbruik:</h3>
            {renderConsumptionResult('electricity', consumption.electricity, 'kWh')}
            {renderConsumptionResult('gas', consumption.gas, 'm³')}
          </div>
        )}

        <div className={styles.footer}>
          <button className={styles.button}>
            <span>Ok</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}