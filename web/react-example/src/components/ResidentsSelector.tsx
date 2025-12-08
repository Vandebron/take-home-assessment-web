import type { ComponentType } from 'react';
import styles from './ResidentsSelector.module.css';
import { People1, People2, People3, People4, People5 } from './icons';

interface ResidentsSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

interface ResidentOption {
  id: number;
  label: string;
  icon: ComponentType;
}

const residentOptions: ResidentOption[] = [
  { id: 1, label: '1 person', icon: People1 },
  { id: 2, label: '2 people', icon: People2 },
  { id: 3, label: '3 people', icon: People3 },
  { id: 4, label: '4 people', icon: People4 },
  { id: 5, label: '5 or more people', icon: People5 },
];

export default function ResidentsSelector({ value, onChange }: ResidentsSelectorProps) {
  return (
    <div className={styles.container}>
      {residentOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={`resident-${option.id}`}
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