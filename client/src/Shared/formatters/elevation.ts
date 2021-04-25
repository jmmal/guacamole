import { MinMaxAvg } from '../types';

/**
 * @param elevation Object representing an activities elevation
 * @returns A string representing the range of elevation.
 */
export const formatElevation = (elevation: MinMaxAvg): string => {
  const { max = 0, min = 0 } = elevation;

  return (max! - min!).toFixed(1).toString() + 'm';
};
