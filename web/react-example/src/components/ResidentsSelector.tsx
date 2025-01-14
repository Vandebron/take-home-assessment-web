import styles from './ResidentsSelector.module.css';
import { People1, People2, People3, People4, People5 } from './icons';

const residentOptions = [<People1 />, <People2 />, <People3 />, <People4 />, <People5 />]

interface ResidentsSelectorProps {
  value: number;
  onChange: (value: number) => void;
}


export default function ResidentsSelector({ value, onChange }: ResidentsSelectorProps) {
  return (
    <div className={styles.container}>
      {residentOptions.map((residentOption, index) => (
        <button
          key={`residentOption-${index + 1}`}
          onClick={() => onChange(index + 1)}
          className={`${styles.button} ${value === index ? styles.selected : ''}`}
        >
          <div className={styles.icons}>
            {residentOption}
          </div>
        </button>
      ))}
    </div>
  );
}