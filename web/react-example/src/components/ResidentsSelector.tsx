import styles from "./ResidentsSelector.module.css";
import globalStyles from "../App.module.css";
import { People1, People2, People3, People4, People5 } from "./icons";
import { useConsumptionCalculationContext } from "../ConsumptionCalculationContextProvider";

const residentOptions = [
  <People1 />,
  <People2 />,
  <People3 />,
  <People4 />,
  <People5 />,
];

export default function ResidentsSelector() {
  const { residents, setResidents } = useConsumptionCalculationContext();
  return (
    <div className={styles.container}>
      {residentOptions.map((residentOption, index) => (
        <button
          key={`residentOption-${index + 1}`}
          role="button"
          aria-label={`Button to select ${index + 1} residents`}
          onClick={() => setResidents(index + 1)}
          className={`${globalStyles.button} ${
            residents === index + 1 ? globalStyles.selected : ""
          }`}
        >
          <div className={globalStyles.icon}>{residentOption}</div>
        </button>
      ))}
    </div>
  );
}
