import { LatLng, Bounds } from ".";

export interface Activity {
  id: string;
  title: string;
  type: string;
  distance: number;
  startTime: Date;
  endTime: Date;
  pace: number;
  elapsedTime: number;
  movingTime: number;
  polyline: string;
  locations: LatLng[];
  bounds: Bounds;
  minElevation: number;
  maxElevation: number;
  image: string;
};

type MinMaxAvg = {
  min: number;
  max: number;
  avg: number;
}

export interface ActivityV2 {
  _id: string;
  title: string;
  type: string;
  distance: number;
  startTime: Date;
  endTime: Date;
  pace: MinMaxAvg;
  elapsedTime: number;
  movingTime: number;
  polyline?: string;
  simplePolyline?: string;
  elevation: MinMaxAvg;
  heartRate: MinMaxAvg;
  calories: number;
  ascent: number;
  descent: number;
  imageURL: string;
  bounds?: Bounds;
  duration: number;
  streamData?: DataPoint[];
}

export type DataPoint = {
  [type: string]: number | Date | null;
}
