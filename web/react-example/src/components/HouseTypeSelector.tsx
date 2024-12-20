import React, { useEffect, useState } from 'react';
import { Home, Building, LucideIcon } from 'lucide-react';
import { getHouseTypes } from './HouseTypeSelector.service';
import styles from './HouseTypeSelector.module.css';

interface HouseTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

type HouseType = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export default function HouseTypeSelector({ value, onChange }: HouseTypeSelectorProps) {

  const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      const types = await getHouseTypes();
      const houseTypes = types.map((type) => ({
        ...type,
        icon: type.id === 'apartment' ? Building : Home
      }));
      setHouseTypes(houseTypes);
    };
    onLoad();
  })

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