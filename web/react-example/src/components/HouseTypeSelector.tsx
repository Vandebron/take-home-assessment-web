import React from 'react';
import { Building2, Home } from 'lucide-react';
import styles from './HouseTypeSelector.module.css';

interface HouseTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const houseTypes = [
  { id: 'apartment', icon: Building2, label: 'Appartement' },
  { id: 'house1', icon: Home, label: 'Huis Type 1' },
  { id: 'house2', icon: Home, label: 'Huis Type 2' },
  { id: 'house3', icon: Home, label: 'Huis Type 3' },
  { id: 'house4', icon: Home, label: 'Huis Type 4' },
];

export default function HouseTypeSelector({ value, onChange }: HouseTypeSelectorProps) {
  return (
    <div className={styles.container}>
      {houseTypes.map((type) => {
        const Icon = type.icon;
        return (
          <button
            key={type.id}
            name={type.id}
            role='button'
            aria-label={type.id}
            onClick={() => onChange(type.id)}
            className={`${styles.button} ${value === type.id ? styles.selected : ''}`}
            aria-selected={value === type.id}
          >
            <Icon className={styles.icon} />
          </button>
        );
      })}
    </div>
  );
}