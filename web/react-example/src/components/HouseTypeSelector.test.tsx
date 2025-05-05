import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HouseTypeSelector from "./HouseTypeSelector";
import { ConsumptionCalculationContext } from "../ConsumptionCalculationContextProvider";
import { Consumption, HouseType, Product } from "../types";
import { HouseApartment } from "./icons";

describe("HouseTypeSelector", () => {
  it("what to do with made up things?", async () => {
    const mockHouseType: HouseType = {
      id: "apartment",
      label: "Apartment",
      icon: <HouseApartment />,
      baseGasConsumption: 1.4,
      basePowerConsumption: 8,
    };

    const mockContextValue = {
      houseType: mockHouseType,
      residents: 2,
      hasSolarPanels: false,
      consumption: undefined as Consumption | undefined,
      product: undefined as Product | undefined,
      setHouseType: vi.fn(),
      setResidents: vi.fn(),
      setHasSolarPanels: vi.fn(),
      setConsumption: vi.fn(),
      setProduct: vi.fn(),
    };

    render(
      <ConsumptionCalculationContext.Provider value={mockContextValue}>
        <HouseTypeSelector />
      </ConsumptionCalculationContext.Provider>
    );

    const button = await screen.findByRole("button", { name: "apartment" });
    expect(button).toHaveAttribute("aria-selected", "true");
  });
});
