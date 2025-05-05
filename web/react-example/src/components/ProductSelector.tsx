import React from "react";
import styles from "./ProductSelector.module.css";
import globalStyles from "../App.module.css";
import { Electric, ElectricAndGas } from "./icons";
import { useConsumptionCalculationContext } from "../ConsumptionCalculationContextProvider";

export default function ProductSelector() {
  const { product, setProduct } = useConsumptionCalculationContext();
  return (
    <div className={styles.container}>
      <button
        role="button"
        aria-label={`Button to select ${product?.label}`}
        className={`${globalStyles.button} ${
          product?.id === "power" ? globalStyles.selected : ""
        }`}
        onClick={() => setProduct({ id: "power", label: "Stroom" })}
      >
        <div className={globalStyles.icon}>
          <Electric />
        </div>
      </button>
      <button
        role="button"
        aria-label={`Button to select ${product?.label}`}
        className={`${globalStyles.button} ${
          product?.id === "power-gas" ? globalStyles.selected : ""
        }`}
        onClick={() => setProduct({ id: "power-gas", label: "Stroom & Gas" })}
      >
        <div className={globalStyles.icon}>
          <ElectricAndGas />
        </div>
      </button>
    </div>
  );
}
