import React, { useState } from 'react';
import HouseTypeSelector from '../HouseTypeSelector';
import ResidentsSelector from '../ResidentsSelector';
import ProductSelector from '../ProductSelector';
import CalculationDetails from './CalculationDetails';
import { SolarPanel } from '../icons';
import styles from './ConsumptionCalculator.module.css';
import {
  calculateConsumption,
  getHouseTypeLabel,
  getProductLabel,
  getHouseTypeMultiplier,
  isValidResidentsCount,
} from './ConsumptionCalculator.service';
import { MIN_RESIDENTS, MAX_RESIDENTS } from '../constants';

/**
 * ConsumptionCalculator Component
 *
 * Main form for calculating household energy consumption.
 * Collects information about house type, number of residents,
 * product type, and solar panel presence to estimate annual usage.
 */
export default function ConsumptionCalculator() {
  // Mode state: 'calculator' or 'manual'
  const [mode, setMode] = useState<'calculator' | 'manual'>('calculator');
  const [showDetails, setShowDetails] = useState(false);

  // Form state
  const [houseType, setHouseType] = useState<string>('apartment');
  const [residents, setResidents] = useState<number>(2);
  const [product, setProduct] = useState<string>('electricity');
  const [hasSolarPanels, setHasSolarPanels] = useState<boolean>(false);

  // Manual input state
  const [manualElectricity, setManualElectricity] = useState<string>('');
  const [manualGas, setManualGas] = useState<string>('');

  // Calculate consumption based on current form values
  const computedConsumption = calculateConsumption(houseType, residents, product, hasSolarPanels);
  const houseMultiplier = getHouseTypeMultiplier(houseType);

  /**
   * Validates and updates the number of residents
   * Only accepts values between MIN_RESIDENTS and MAX_RESIDENTS
   */
  const handleResidentsSelectorChange = (incomingResidents: number): void => {
    if (isValidResidentsCount(incomingResidents, MIN_RESIDENTS - 1, MAX_RESIDENTS + 1)) {
      setResidents(incomingResidents);
    }
  };

  /**
   * Handles form submission
   * Shows calculation details or logs manual input
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'manual') {
      console.log('Manual input:', {
        electricity: Number.parseInt(manualElectricity, 10) || 0,
        gas: Number.parseInt(manualGas, 10) || 0,
      });
      // Here you would typically navigate or submit
    } else {
      setShowDetails(true);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'calculator' ? 'manual' : 'calculator'));
  };

  return (
    <>
      <section className={styles.calculator} aria-labelledby="calculator-title">
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1 id="calculator-title" className={styles.title}>
              Verbruik berekenen
            </h1>
            <button onClick={toggleMode} className={styles.link} type="button">
              {mode === 'calculator' ? 'Ik weet mijn verbruik' : 'Help mij schatten'}
            </button>
          </div>
          <button type="button" className={styles.closeButton} aria-label="Close">
            ×
          </button>
        </header>

        <form className={styles.content} onSubmit={handleSubmit}>
          {mode === 'calculator' ? (
            <>
              <div className={styles.row}>
                <fieldset className={styles.section}>
                  <legend className={styles.label}>
                    Type woning:{' '}
                    <span className={styles.labelValue}>{getHouseTypeLabel(houseType)}</span>
                  </legend>
                  <HouseTypeSelector value={houseType} onChange={setHouseType} />
                </fieldset>
                <fieldset className={styles.section}>
                  <legend className={styles.label}>
                    Aantal bewoners: <span className={styles.labelValue}>{residents}</span>
                  </legend>
                  <ResidentsSelector value={residents} onChange={handleResidentsSelectorChange} />
                </fieldset>
              </div>

              <div className={styles.row}>
                <fieldset className={styles.section}>
                  <legend className={styles.label}>
                    Product: <span className={styles.labelValue}>{getProductLabel(product)}</span>
                  </legend>
                  <ProductSelector value={product} onChange={setProduct} />
                </fieldset>

                <div className={styles.actionColumn}>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="solarPanels"
                      checked={hasSolarPanels}
                      onChange={({ target: { checked } }) => setHasSolarPanels(checked)}
                      aria-describedby="solarPanels-info"
                    />
                    <label htmlFor="solarPanels">
                      <SolarPanel />
                      <span>Zonnepanelen</span>
                      <span className={styles.tooltipWrapper}>
                        <span
                          id="solarPanels-info"
                          className={styles.infoIcon}
                          aria-hidden="true"
                        >
                          i
                        </span>
                        <span className={styles.tooltipText}>
                          Zonnepanelen verlagen je stroomverbruik gemiddeld met 30%.
                        </span>
                      </span>
                    </label>
                  </div>

                  <button type="submit" className={styles.button} aria-label="Bereken verbruik">
                    <span>Ok</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="manualElectricity" className={styles.label}>
                    Stroomverbruik
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="number"
                      id="manualElectricity"
                      value={manualElectricity}
                      onChange={({ target: { value } }) => setManualElectricity(value)}
                      className={styles.input}
                      placeholder="0"
                      min="0"
                    />
                    <span className={styles.suffix}>kWh</span>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="manualGas" className={styles.label}>
                    Gasverbruik
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="number"
                      id="manualGas"
                      value={manualGas}
                      onChange={({ target: { value } }) => setManualGas(value)}
                      className={styles.input}
                      placeholder="0"
                      min="0"
                    />
                    <span className={styles.suffix}>m³</span>
                  </div>
                </div>
              </div>

              <div className={styles.buttonRow}>
                <button type="submit" className={styles.button} aria-label="Bereken verbruik">
                  <span>Ok</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </>
          )}
        </form>
      </section>

      <CalculationDetails
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        houseType={houseType}
        residents={residents}
        hasSolarPanels={hasSolarPanels}
        multiplier={houseMultiplier}
        electricity={computedConsumption.electricity}
        gas={computedConsumption.gas}
      />
    </>
  );
}
