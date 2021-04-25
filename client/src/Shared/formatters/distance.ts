/**
 * Takes a number representing a distance in meters and returns a
 * returns a string representation of it in kilometers.
 * @example
 * // returns 1.13km
 * formatDistance(1130)
 */
export const formatDistance = (distance: number): string => {
  return Number(distance / 1000).toFixed(2) + 'km';
};
