import { JSX } from "react";

export type HouseType = {
  id: string;
  label: string;
  icon: JSX.Element;
  basePowerConsumption: number;
  baseGasConsumption: number;
};
