import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { getHouseTypes } from './HouseTypeSelector.service';
import styles from './HouseTypeSelector.module.css';
import { HOUSE_TYPES } from './types.ts';
import { HouseApartment, HouseRowHome, HouseCornerHouse, HouseSemiDetached, HouseFreestanding } from './icons';

interface HouseTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

interface HouseType {
  id: string;
  label: string;
  icon: ComponentType;
}

const iconMap: Record<string, ComponentType> = {
  [HOUSE_TYPES.APARTMENT]: HouseApartment,
  [HOUSE_TYPES.TOWNHOUSE]: HouseRowHome,
  [HOUSE_TYPES.CORNER_HOUSE]: HouseCornerHouse,
  [HOUSE_TYPES.TWO_UNDER_ONE_ROOF]: HouseSemiDetached,
  [HOUSE_TYPES.DETACHED_HOUSE]: HouseFreestanding,
};

export default function HouseTypeSelector({ value, onChange }: HouseTypeSelectorProps) {
  const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);

useEffect(() => {
    const loadHouseTypes = async () => {
      const types = await getHouseTypes();
      const typesWithIcons = types.map(type => {
        return {
          id: type.id,
          label: type.label,
          icon: iconMap[type.id] || HouseRowHome
        };
      });
      setHouseTypes(typesWithIcons);
    };
    loadHouseTypes();
  }, []);

  return (
    <div className={styles.container}>
      {houseTypes.map((option) => {
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