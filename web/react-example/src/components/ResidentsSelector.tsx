import styles from './ResidentsSelector.module.css';
import { People1, People2, People3, People4, People5 } from './icons';

const residentOptions = [<People1 />, <People2 />, <People3 />, <People4 />, <People5 />];

interface ResidentsSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ResidentsSelector({ value, onChange }: ResidentsSelectorProps) {
  // Ensure value is within valid range (1-5)
  const safeValue = Math.max(1, Math.min(5, value));

  return (
    <div className={styles.container}>
      {residentOptions.map((residentOption, index) => (
        <button
          key={`residentOption-${index + 1}`}
          onClick={() => onChange(index + 1)}
          className={`${styles.button} ${safeValue === index + 1 ? styles.selected : ''}`}
          aria-label={`${index + 1} residents`}
          aria-selected={safeValue === index + 1}
        >
          <div className={styles.icons}>
            {residentOption}
          </div>
        </button>
      ))}
    </div>
  );
}