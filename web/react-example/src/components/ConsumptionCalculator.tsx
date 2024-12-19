import React, { useState } from 'react';
import { X } from 'lucide-react';
import HouseTypeSelector from './HouseTypeSelector';
import ResidentsSelector from './ResidentsSelector';
import ProductSelector from './ProductSelector';
import styles from './ConsumptionCalculator.module.css';

export default function ConsumptionCalculator() {
  const [houseType, setHouseType] = useState('apartment');
  const [residents, setResidents] = useState(8);
  const [hasSolarPanels, setHasSolarPanels] = useState(false);

  return (
    <div className={styles.calculator}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Verbruik berekenen</h2>
          <a href="#" className={styles.link}>Ik weet mijn verbruik</a>
        </div>
        <button className={styles.closeButton}>
          <X size={24} />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.section}>
            <p className={styles.label}>Type woning:</p>
            <HouseTypeSelector value={houseType} onChange={setHouseType} />
          </div>
          <div className={styles.section}>
            <p className={styles.label}>Aantal bewoners:</p>
            <ResidentsSelector value={residents} onChange={setResidents} />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Product:</p>
          <ProductSelector />
        </div>

        <div className={styles.footer}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="solarPanels"
              checked={hasSolarPanels}
              onChange={(e) => setHasSolarPanels(e.target.checked)}
            />
            <label htmlFor="solarPanels">
              <span>Zonnepanelen</span>
              <span className={styles.infoIcon} title="Information about solar panels">ⓘ</span>
            </label>
          </div>

          <button className={styles.button}>
            <span>Ok</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}