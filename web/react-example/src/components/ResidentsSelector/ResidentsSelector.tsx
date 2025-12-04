import { JSX } from 'react';
import styles from './ResidentsSelector.module.css';
import { People1, People2, People3, People4, People5 } from '../icons';

/**
 * Icon components for 1-5 residents
 * Array index corresponds to (number of residents - 1)
 */
const residentOptions: JSX.Element[] = [
  <People1 />,
  <People2 />,
  <People3 />,
  <People4 />,
  <People5 />,
];

interface ResidentsSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

/**
 * ResidentsSelector Component
 *
 * Allows selection of number of residents (1-5)
 * Displays icon buttons representing different household sizes
 */
export default function ResidentsSelector({ value, onChange }: ResidentsSelectorProps) {
  return (
    <fieldset className={styles.container} aria-label="Number of residents selection">
      {residentOptions.map((residentOption, index) => (
        <button
          key={`residentOption-${index + 1}`}
          type="button"
          onClick={() => onChange(index + 1)}
          className={`${styles.button} ${value === index + 1 ? styles.selected : ''}`}
          aria-label={`${index + 1} resident${index > 0 ? 's' : ''}`}
          aria-pressed={value === index + 1}
        >
          <div className={styles.icons}>{residentOption}</div>
        </button>
      ))}
    </fieldset>
  );
}
