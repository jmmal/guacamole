/**
 * Converts a number value (representing a speed in m/s) into a string representation
 * of the value in minutes / kilometer
 * @example
 * // returns 6:00
 * formatPace(2.7778)
 */
export const formatPace = (value: number): string => {
  const minutes = Math.floor(value / 60);
  const seconds = `${Math.floor(value - minutes * 60)}`;

  return `${minutes}:${seconds.padStart(2, '0')}`;
};
