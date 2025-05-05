const houseTypes = [
  {
    id: "apartment",
    label: "Appartement",
    basePowerConsumption: 12,
    baseGasConsumption: 1.4,
  },
  {
    id: "townhouse",
    label: "Tussenwoning",
    basePowerConsumption: 18,
    baseGasConsumption: 1.8,
  },
  {
    id: "corner-house",
    label: "Hoekwoning",
    basePowerConsumption: 22,
    baseGasConsumption: 2.2,
  },
  {
    id: "two-under-one-roof",
    label: "2 onder 1 Kap",
    basePowerConsumption: 20,
    baseGasConsumption: 2,
  },
  {
    id: "detatched-house",
    label: "Vrijstaand",
    basePowerConsumption: 25,
    baseGasConsumption: 2.5,
  },
];

/* We know this could return synchronously... Please leave it as an async Promise :) */
export const getHouseTypes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(houseTypes);
    }, 500);
  });
};
