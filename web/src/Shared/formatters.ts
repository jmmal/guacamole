import { MinMaxAvg } from '../Activities/models/Activity';

/**
 * Converts a number value (representing a speed in m/s) into a string representation
 * of the value in Minutes / Kilometer
 */
export const formatPace = (value: number): string => {
  const minutes = Math.floor(value / 60);
  const seconds = `${Math.floor(value - minutes * 60)}`;

  return `${minutes}:${seconds.padStart(2, '0')}`;
};

/**
 * Converts value (representing a duration in seconds) into a string formatted
 * as hh mm ss
 * e.g. 1h 28m or 28m 10s
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

export const formatElevation = (elevation: MinMaxAvg): string => {
  const { max = 0, min = 0 } = elevation;

  return (max! - min!).toFixed(1).toString() + 'm';
};

export const formatDistance = (distance: number): string => {
  return Number(distance / 1000).toFixed(2) + 'km';
};

export const formatTitle = (start: Date, type: string): string => {
  const date = new Date(start);
  console.log(date);
  const hourOfDay = date.getHours();
  console.log(hourOfDay);

  let timeOfDayString = 'Morning';
  if (hourOfDay >= 12) {
    timeOfDayString = 'Lunch';
  }
  if (hourOfDay >= 14) {
    timeOfDayString = 'Afternoon';
  }
  if (hourOfDay >= 16) {
    timeOfDayString = 'Evening';
  }
  if (hourOfDay >= 21) {
    timeOfDayString = 'Night';
  }

  const activityString = ActivityTypeMap.get(type) ?? 'Workout';

  console.log(`${timeOfDayString} ${activityString}`);
  return `${timeOfDayString} ${activityString}`;
};

const ActivityTypeMap: Map<string, string> = new Map([
  ['Running', 'Run'],
  ['Cycling', 'Ride'],
  ['Hiking', 'Hike'],
]);
