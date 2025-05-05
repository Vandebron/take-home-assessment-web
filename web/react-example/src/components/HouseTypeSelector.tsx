import { JSX, useEffect, useState } from "react";
import { getHouseTypes } from "./HouseTypeSelector.service";
import styles from "./HouseTypeSelector.module.css";
import globalStyles from "../App.module.css";
import { HouseType } from "src/types/HouseType";
import {
  HouseApartment,
  HouseCornerHouse,
  HouseFreestanding,
  HouseRowHome,
  HouseSemiDetached,
} from "./icons";
import { useConsumptionCalculationContext } from "../ConsumptionCalculationContextProvider";

const HOUSE_TYPE_ICON_MAP: Record<string, JSX.Element> = {
  apartment: <HouseApartment />,
  townhouse: <HouseRowHome />,
  "corner-house": <HouseCornerHouse />,
  "two-under-one-roof": <HouseSemiDetached />,
  "detatched-house": <HouseFreestanding />,
};

export default function HouseTypeSelector() {
  const { houseType, setHouseType } = useConsumptionCalculationContext();
  const [houseTypes, setHouseTypes] = useState<HouseType[]>();

  useEffect(() => {
    const onLoad = async () => {
      let types = await getHouseTypes();

      setHouseTypes(types as HouseType[]);
    };
    onLoad();
  });

  return (
    <div className={styles.container}>
      {houseTypes?.map((type) => {
        const Icon = HOUSE_TYPE_ICON_MAP[type.id];
        return (
          <button
            key={type.id}
            name={type.id}
            role="button"
            aria-label={`Button to select ${type.label}`}
            onClick={() => setHouseType(type)}
            className={`${globalStyles.button} ${
              houseType?.id === type.id ? globalStyles.selected : ""
            }`}
            aria-pressed={houseType?.id === type.id}
          >
            <div className={globalStyles.icon}>{Icon ?? null}</div>
          </button>
        );
      })}
    </div>
  );
}
