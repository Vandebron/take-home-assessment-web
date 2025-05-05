import React, { useEffect, useState } from "react";
import HouseTypeSelector from "./HouseTypeSelector";
import ResidentsSelector from "./ResidentsSelector";
import ProductSelector from "./ProductSelector";
import styles from "./ConsumptionCalculator.module.css";
import { SolarPanel } from "./icons";
import { useConsumptionCalculationContext } from "../ConsumptionCalculationContextProvider";
import { ComputedConsumption } from "src/types";

export default function ConsumptionCalculator() {
  const { hasSolarPanels, setHasSolarPanels } =
    useConsumptionCalculationContext();
  const { residents, houseType, product } = useConsumptionCalculationContext();
  const [computedConsumption, setComputedConsumption] =
    useState<ComputedConsumption>();

  const calculateConsumption = (): ComputedConsumption => {
    // I got these numbers from power and gas usage estimates
    const electricityPerPersonFactor = 2.5;
    const gasPerPersonFactor = 0.5;

    const baseElectricity = houseType?.basePowerConsumption || 10;
    const baseGas = houseType?.baseGasConsumption || 1.5;

    const peopleElectricity = residents * electricityPerPersonFactor;
    const peopleGas = residents * gasPerPersonFactor;

    return {
      electricity: baseElectricity + peopleElectricity,
      gas: baseGas + peopleGas,
    };
  };
  useEffect(() => {
    setComputedConsumption(calculateConsumption());
  }, [residents, houseType]);

  return (
    <div className={styles.calculator}>
      <header className={styles.header}>
        <h2 className={styles.title}>Verbruik berekenen</h2>
        <a href="#">Ik weet mijn verbruik</a>
      </header>

      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.section}>
            <div className={styles.label}>
              <p>Type woning:</p> {houseType?.label}
            </div>
            <HouseTypeSelector />
          </div>
          <div className={styles.section}>
            <div className={styles.label}>
              <p>Aantal bewoners:</p> {residents}
            </div>
            <ResidentsSelector />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.section}>
            <div className={styles.label}>
              <p>Product:</p> {product?.label}
            </div>
            <ProductSelector />
          </div>
          <div className={styles.section}>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="solarPanels"
                checked={hasSolarPanels}
                onChange={(e) => setHasSolarPanels(e.target.checked)}
              />
              <label htmlFor="solarPanels">
                <span>
                  <SolarPanel />
                  Zonnepanelen
                </span>
                <span
                  className={styles.infoIcon}
                  title="Information about solar panels"
                >
                  &nbsp;ⓘ
                </span>
              </label>
            </div>

            <div className={styles.row}>
              <div className={styles.label}>
                <p>Electricity:</p> {computedConsumption?.electricity}/
                <p>Gas:</p> {computedConsumption?.gas}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.row}>
            <button className={styles.button}>
              <span>Ok</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
