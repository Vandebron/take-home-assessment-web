import React, { useState } from "react";
import ConsumptionCalculator from "./components/ConsumptionCalculator";
import styles from "./App.module.css";
import { ConsumptionCalculationContext } from "./ConsumptionCalculationContextProvider";

import { Consumption, HouseType, Product } from "./types";
import { HouseApartment } from "./components/icons";

export default function App() {
  const [houseType, setHouseType] = useState<HouseType | undefined>({
    id: "apartment",
    label: "Apartment",
    icon: <HouseApartment />,
    baseGasConsumption: 1.4,
    basePowerConsumption: 12,
  });
  const [residents, setResidents] = useState<number>(1);
  const [hasSolarPanels, setHasSolarPanels] = useState<boolean>(false);
  const [consumption, setConsumption] = useState<Consumption | undefined>(
    undefined
  );
  const [product, setProduct] = useState<Product | undefined>({
    id: "power",
    label: "Stroom",
  });
  return (
    <div className={styles.container}>
      <ConsumptionCalculationContext.Provider
        value={{
          houseType,
          residents,
          hasSolarPanels,
          consumption,
          product,
          setHouseType,
          setResidents,
          setHasSolarPanels,
          setConsumption,
          setProduct,
        }}
      >
        <ConsumptionCalculator />
      </ConsumptionCalculationContext.Provider>
    </div>
  );
}
