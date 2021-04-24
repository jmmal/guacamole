export type MinMaxAvg = {
  min: number | null;
  max: number | null;
  avg: number | null;
};

export interface Activity {
  _id: string;
  objectKey?: string;
  title: string;
  type: string;
  distance: number;
  startTime: Date;
  endTime: Date;
  pace: MinMaxAvg;
  elapsedTime: number;
  movingTime: PointValue;
  polyline?: string;
  simplePolyline?: string;
  elevation: MinMaxAvg;
  heartRate: MinMaxAvg;
  calories: number;
  ascent: PointValue;
  descent: PointValue;
  imageURL: string | null;
  duration: number;
  streamData?: DataPoint[];
}

type PointValue = number | null;

export type DataPoint = {
  time: Date;
  heartRate: PointValue;
  altitude: PointValue;
  cadence: PointValue;
  distance: PointValue;
  speed: PointValue;
  grade: PointValue;
  gradeAdjustedSpeed: PointValue;
  speedInMPM: PointValue;
};

export type StatVal = number | null;
export type ActivitySummary = {
  _id: string;
  type: string;
  startTime: Date;
  pace: {
    min: StatVal;
    max: StatVal;
    avg: StatVal;
  };
  calories: StatVal;
  distance: StatVal;
  duration: StatVal;
};
