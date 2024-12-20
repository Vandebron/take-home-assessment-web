import React from 'react';
import { Users } from 'lucide-react';
import styles from './ResidentsSelector.module.css';

interface ResidentsSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const residentOptions = [1, 2, 3, 4, 5];

export default function ResidentsSelector({ value, onChange }: ResidentsSelectorProps) {
  return (
    <div className={styles.container}>
      {residentOptions.map((number) => (
        <button
          key={number}
          onClick={() => onChange(number)}
          className={`${styles.button} ${value === number ? styles.selected : ''}`}
        >
          <div className={styles.icons}>
            {Array(number)
              .fill(null)
              .map((_, i) => (
                <Users className={styles.icon} />
              ))}
          </div>
        </button>
      ))}
    </div>
  );
}