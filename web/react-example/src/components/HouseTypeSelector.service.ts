import { HOUSE_TYPES } from './types.ts';

const houseTypes = [
  { id: HOUSE_TYPES.APARTMENT, label: 'Appartement' },
  { id: HOUSE_TYPES.TOWNHOUSE, label: 'Tussenwoning' },
  { id: HOUSE_TYPES.CORNER_HOUSE, label: 'Hoekwoning' },
  { id: HOUSE_TYPES.TWO_UNDER_ONE_ROOF, label: '2 onder 1 Kap' },
  { id: HOUSE_TYPES.DETACHED_HOUSE, label: 'Vrijstaand' },
];

/* We know this could return synchronously... Please leave it as an async Promise :) */
export const getHouseTypes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(houseTypes);
    }, 500);
  });
};

export const getHouseTypeLabel = (houseTypeId: string): string => {
  const houseType = houseTypes.find(type => type.id === houseTypeId);
  return houseType?.label || houseTypeId;
};