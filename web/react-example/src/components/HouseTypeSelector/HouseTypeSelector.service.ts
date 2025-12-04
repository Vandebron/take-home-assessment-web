/**
 * House type data structure
 */
export type HouseTypeData = {
  id: string;
  label: string;
};

/**
 * Available house types with display labels
 */
const houseTypes: HouseTypeData[] = [
  { id: 'apartment', label: 'Appartement' },
  { id: 'townhouse', label: 'Tussenwoning' },
  { id: 'corner-house', label: 'Hoekwoning' },
  { id: 'two-under-one-roof', label: '2 onder 1 Kap' },
  { id: 'detatched-house', label: 'Vrijstaand' },
];

/**
 * Fetches house types asynchronously
 *
 * Note: This simulates an API call with a 500ms delay.
 * We know this could return synchronously, but it's kept async
 * to demonstrate async data loading patterns.
 *
 * @returns Promise that resolves to array of house type data
 */
export const getHouseTypes = async (): Promise<HouseTypeData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(houseTypes);
    }, 500);
  });
};
