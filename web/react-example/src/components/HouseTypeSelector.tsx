import { useEffect, useState } from 'react';
import { getHouseTypes } from './HouseTypeSelector.service';
import styles from './HouseTypeSelector.module.css';
import {  HouseRowHome } from './icons';

interface HouseTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

type HouseType = {
  id: string;
  label: string;
  icon: JSX.Element;
};

export default function HouseTypeSelector({ value, onChange }: HouseTypeSelectorProps) {

  const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      let types = await getHouseTypes();
      (types as {id: string, icon?: JSX.Element}[]).forEach((type) => {
        // two-person homes
        if (type.id === 'apartment' || type.id === 'townhouse') {
          if (type.id === 'apartment') {
            type.icon = <HouseRowHome />;
          } else if (type.id === 'townhouse') {
            type.icon = <HouseRowHome />;
          } else {
            type.icon = <HouseRowHome />;
          }
        } else {
          type.icon = <HouseRowHome />
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
            {Icon ?? null}
          </button>
        );
      })}
    </div>
  );
}