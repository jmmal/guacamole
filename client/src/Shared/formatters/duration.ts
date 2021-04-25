/**
 * Converts a numer representing a duration in seconds into a string formatted
 * as hh mm ss
 * @example
 * // returns 31m 22s
 * formatDuration(1882)
 */
export const formatDuration = (value: number): string => {
  const totalMinutes = Math.floor(value / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const seconds = Math.floor(value - totalMinutes * 60);

  if (totalHours >= 1) {
    return `${totalHours}h ${totalMinutes % 60}m`;
  }

  return `${totalMinutes}m ${seconds}s`;
};
