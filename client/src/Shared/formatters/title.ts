/**
 * @param start Starting time of the activity
 * @param type Type of activity
 * @returns A title for the activity based on its type and starting time
 * @example
 * // returns "Morning Run"
 * formatTime("2020-01-01-10-10-10", "Running")
 */
export const formatTitle = (start: Date, type: string): string => {
  const date = new Date(start);
  const hourOfDay = date.getHours();

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

  return `${timeOfDayString} ${activityString}`;
};

const ActivityTypeMap: Map<string, string> = new Map([
  ['Running', 'Run'],
  ['Cycling', 'Ride'],
  ['Hiking', 'Hike'],
]);
