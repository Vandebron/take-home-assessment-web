import { createContext, useContext } from "react";
import { Consumption, HouseType, Product } from "./types";

type ConsumptionCalculationProps = {
  houseType: HouseType | undefined;
  residents: number;
  hasSolarPanels: boolean;
  consumption: Consumption | undefined;
  product: Product | undefined;
  setHouseType: (houseType: HouseType) => void;
  setResidents: (residents: number) => void;
  setHasSolarPanels: (hasSolarPanels: boolean) => void;
  setConsumption: (consumption: Consumption) => void;
  setProduct: (product: Product) => void;
};
export const ConsumptionCalculationContext = createContext<
  ConsumptionCalculationProps | undefined
>(undefined);

export const useConsumptionCalculationContext = () => {
  const context = useContext(ConsumptionCalculationContext);

  if (!context) {
    throw new Error(
      "useConsumptionCalculationContext must be used within ConsumptionCalculationContext Provider"
    );
  }

  return context;
};
