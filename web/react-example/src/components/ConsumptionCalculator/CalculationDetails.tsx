import React from 'react';
import styles from './CalculationDetails.module.css';
import { CONSUMPTION_CONSTANTS, HOUSE_TYPE_LABELS } from '../constants';

interface CalculationDetailsProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly houseType: string;
  readonly residents: number;
  readonly hasSolarPanels: boolean;
  readonly multiplier: number;
  readonly electricity: number;
  readonly gas?: number;
}

/**
 * CalculationDetails Component
 *
 * Displays a breakdown of how the energy consumption was calculated.
 * Shows base values, multipliers, and corrections.
 */
export default function CalculationDetails({
  isOpen,
  onClose,
  houseType,
  residents,
  hasSolarPanels,
  multiplier,
  electricity,
  gas,
}: CalculationDetailsProps) {
  if (!isOpen) return null;

  return (
    <dialog className={styles.overlay} open aria-labelledby="details-title">
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 id="details-title" className={styles.title}>
            Berekening Details
          </h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close details">
            ×
          </button>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Factoren</h3>
            <ul className={styles.list}>
              <li>
                <span className={styles.label}>Woningtype ({HOUSE_TYPE_LABELS[houseType]}):</span>
                <span className={styles.value}>x {multiplier}</span>
              </li>
              <li>
                <span className={styles.label}>Aantal bewoners:</span>
                <span className={styles.value}>{residents}</span>
              </li>
              {hasSolarPanels && (
                <li>
                  <span className={styles.label}>Zonnepanelen correctie:</span>
                  <span className={styles.value}>
                    -{CONSUMPTION_CONSTANTS.SOLAR_PANEL_REDUCTION * 100}%
                  </span>
                </li>
              )}
            </ul>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Stroom</h3>
            <div className={styles.calculation}>
              <p>
                Basis ({CONSUMPTION_CONSTANTS.BASE_ELECTRICITY_PER_PERSON} kWh) × {residents} bewoners
                × {multiplier} woningfactor
                {hasSolarPanels ? ' × 0.7 (zonnepanelen)' : ''}
              </p>
              <p className={styles.total}>= {electricity} kWh</p>
            </div>
          </section>

          {gas !== undefined && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Gas</h3>
              <div className={styles.calculation}>
                <p>
                  Basis ({CONSUMPTION_CONSTANTS.BASE_GAS_PER_PERSON} m³) × {residents} bewoners ×{' '}
                  {multiplier} woningfactor
                </p>
                <p className={styles.total}>= {gas} m³</p>
              </div>
            </section>
          )}
        </div>

        <footer className={styles.footer}>
          <button onClick={onClose} className={styles.button}>
            Sluiten
          </button>
        </footer>
      </div>
    </dialog>
  );
}

