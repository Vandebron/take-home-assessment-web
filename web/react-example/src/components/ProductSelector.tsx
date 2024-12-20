import React from 'react';
import styles from './ProductSelector.module.css';
import { Flame, LucideIcon, Zap } from 'lucide-react';

export const ENERGY_TYPES = {
  gas: 'gas',
  electricity: 'electricity'
} as const;
export type EnergyType = keyof typeof ENERGY_TYPES;

type IconMap = Record<EnergyType, LucideIcon>;

const iconMap: IconMap = {
  [ENERGY_TYPES.gas]: Flame,
  [ENERGY_TYPES.electricity]: Zap
};

type ProductSelectorProps = {
  value: EnergyType | undefined;
  onChange: (product: EnergyType) => void;
};



export default function ProductSelector({ value, onChange }: ProductSelectorProps) {
  return (
    <div className={styles.container}>
      {(Object.keys(ENERGY_TYPES) as EnergyType[]).map((energyType) => {
        const Icon = iconMap[energyType];
        return (
          <button
            key={energyType}
            onClick={() => onChange(energyType)}
            className={`${styles.button} ${value === energyType ? styles.selected : ''}`}
          >
            <div className={styles.icons}>
              <Icon />
            </div>
          </button>
        );
      })}
    </div>
  );
}