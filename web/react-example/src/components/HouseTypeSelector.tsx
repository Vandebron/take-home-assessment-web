import { useEffect, useState } from 'react';
import { getHouseTypes } from './HouseTypeSelector.service';
import styles from './HouseTypeSelector.module.css';
import { HouseApartment, HouseRowHome } from './icons';

interface HouseTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

type HouseType = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type HouseTypeFromService = {
  id: string;
  label: string;
};

export default function HouseTypeSelector({ value, onChange }: HouseTypeSelectorProps) {
  const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      const types = await getHouseTypes() as HouseTypeFromService[];
      const typesWithIcons = types.map(type => ({
        ...type,
        icon: type.id === 'apartment' ? <HouseApartment /> : <HouseRowHome />
      }));
      setHouseTypes(typesWithIcons);
    };
    onLoad();
  }, []); // Empty dependency array since we only want to load once

  return (
    <div className={styles.container}>
      {houseTypes.map((type) => (
        <button
          key={type.id}
          name={type.id}
          role='button'
          aria-label={type.id}
          onClick={() => onChange(type.id)}
          className={`${styles.button} ${value === type.id ? styles.selected : ''}`}
          aria-selected={value === type.id}
        >
          {type.icon}
        </button>
      ))}
    </div>
  );
}