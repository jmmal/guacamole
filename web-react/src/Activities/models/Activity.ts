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
