import React, { useEffect, useState } from 'react';
import { icons, Home, Building, LucideIcon, Building2 } from 'lucide-react';
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
      let types = await getHouseTypes();
      types.forEach((type) => {
        // two-person homes
        if (type.id === 'apartment' || type.id === 'townhouse') {
          if (type.id === 'apartment') {
            type.icon = Home;
          } else if (type.id === 'townhouse') {
            type.icon = Building;
          } else {
            type.icon = Building2;
          }
        } else {
          type.icon = icons['house-plus']
        }
      });
      setHouseTypes(types as HouseType[]);
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
            {Icon ? <Icon className={styles.icon} /> : null}
          </button>
        );
      })}
    </div>
  );
}