import type { ComponentType } from 'react';
import { Electric, ElectricAndGas } from './icons';
import styles from './ProductSelector.module.css';
import { PRODUCT_TYPES } from './types';

interface ProductSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

interface ProductOption {
  id: string;
  label: string;
  icon: ComponentType;
}

const productOptions: ProductOption[] = [
  { id: PRODUCT_TYPES.ELECTRIC, label: 'Electricity', icon: Electric },
  { id: PRODUCT_TYPES.ELECTRIC_AND_GAS, label: 'Electricity and gas', icon: ElectricAndGas },
];

export default function ProductSelector({ value, onChange }: ProductSelectorProps) {
  return (
    <div className={styles.container}>
      {productOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            className={`${styles.button} ${value === option.id ? styles.selected : ''}`}
            onClick={() => onChange(option.id)}
            aria-label={option.label}
            aria-selected={value === option.id}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
}