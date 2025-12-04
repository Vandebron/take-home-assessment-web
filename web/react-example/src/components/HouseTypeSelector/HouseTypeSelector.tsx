import { JSX, useEffect, useState } from 'react';
import { getHouseTypes, HouseTypeData } from './HouseTypeSelector.service';
import styles from './HouseTypeSelector.module.css';
import {
  HouseApartment,
  HouseRowHome,
  HouseCornerHouse,
  HouseSemiDetached,
  HouseFreestanding,
} from '../icons';

interface HouseTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Extended house type with icon component
 */
type HouseType = HouseTypeData & {
  icon: JSX.Element;
};

/**
 * HouseTypeSelector Component
 *
 * Displays a selection of house types with icons.
 * Loads house type data asynchronously and assigns appropriate icons.
 */
export default function HouseTypeSelector({
  value,
  onChange,
}: HouseTypeSelectorProps) {
  const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);

  useEffect(() => {
    const loadHouseTypes = async (): Promise<void> => {
      const types = await getHouseTypes();

      // Map house type data to include appropriate icons
      const typesWithIcons: HouseType[] = types.map((type) => {
        let icon: JSX.Element;

        switch (type.id) {
          case 'apartment':
            icon = <HouseApartment />;
            break;
          case 'townhouse':
            icon = <HouseRowHome />;
            break;
          case 'corner-house':
            icon = <HouseCornerHouse />;
            break;
          case 'two-under-one-roof':
            icon = <HouseSemiDetached />;
            break;
          case 'detatched-house':
            icon = <HouseFreestanding />;
            break;
          default:
            icon = <HouseRowHome />;
        }

        return { ...type, icon };
      });

      setHouseTypes(typesWithIcons);
    };

    loadHouseTypes();
  }, []);

  return (
    <div
      className={styles.container}
      role="group"
      aria-label="House type selection"
    >
      {houseTypes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          name={id}
          aria-label={label}
          onClick={() => onChange(id)}
          className={`${styles.button} ${value === id ? styles.selected : ''}`}
          aria-pressed={value === id}
        >
          {Icon ?? null}
        </button>
      ))}
    </div>
  );
}
