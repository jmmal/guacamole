import { ActivitySummary } from '../Activities/models/Activity';
import { StatsSummary } from '../types';

export const range = (from: number, to: number): number[] => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
};

const distanceAccumulator = (prev: number, curr: ActivitySummary) =>
  prev + (curr.distance ?? 0);
const durationAccumulator = (prev: number, curr: ActivitySummary) =>
  prev + (curr.duration ?? 0);

export const calculateStats = (activities: ActivitySummary[]): StatsSummary => {
  const totalDistance = Math.floor(
    activities.reduce(distanceAccumulator, 0) / 1000
  );

  const totalTime = activities.reduce(durationAccumulator, 0);

  const allRuns = activities.filter((val) =>
    val.type.toLowerCase().includes('run')
  );
  const runsDistance = Math.floor(
    allRuns.reduce(distanceAccumulator, 0) / 1000
  );
  const runsDuration = allRuns.reduce(durationAccumulator, 0);

  const runsThisYear = allRuns.filter(
    (val) => new Date(val.startTime).getFullYear() === 2021
  );

  const thisYearDist = Math.floor(
    runsThisYear.reduce(distanceAccumulator, 0) / 1000
  );
  const thisYearDuration = runsThisYear.reduce(durationAccumulator, 0);

  return {
    allTime: {
      count: activities.length,
      distance: totalDistance,
      duration: totalTime,
    },
    runs: {
      count: allRuns.length,
      distance: runsDistance,
      duration: runsDuration,
    },
    year: {
      count: runsThisYear.length,
      distance: thisYearDist,
      duration: thisYearDuration,
    },
  };
};
