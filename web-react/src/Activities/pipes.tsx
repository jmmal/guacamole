export const Pipes = {
  /**
   * Converts value (representing a duration in seconds) into a string formatted 
   * as hh mm ss
   * e.g. 1h 28m or 28m 10s
   */
  duration: (value: number): string => {
    const totalMinutes = Math.floor(value / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const seconds = value - totalMinutes * 60;

    if (totalHours >= 1) {
      return `${totalHours}h ${totalMinutes % 60}m`;
    }

    return `${totalMinutes}m ${seconds}s`;
  },

  /**
   * Converts a number value (representing a speed in m/s) into a string representation
   * of the value in Minutes / Kilometer
   */
  pace: (value: number): string => {
    const minutes = Math.floor(value / 60);
    const seconds = `${Math.floor(value - (minutes * 60))}`;

    return `${minutes}:${seconds.padStart(2, '0')}`;
  }
}