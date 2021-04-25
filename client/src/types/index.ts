export type Summary = {
  count: number;
  distance: number;
  duration: number;
};

export type StatsSummary = {
  allTime: Summary;
  runs: Summary;
  year: Summary;
};
