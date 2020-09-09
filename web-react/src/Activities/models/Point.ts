import { LatLng } from "./LatLng";

export interface Point {
  time: Date;

  /** Represents the distance in meters since the beginning of the activity */
  distanceFromStart: number;

  /** Represents the pace in m/s for the particular point */
  pace: number;

  /** The elevation at the given point (relative to sea level (??)) */
  elevation: number;
  latLng: LatLng;
};
