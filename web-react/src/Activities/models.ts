export type GetAllResponse = {
  totalCount: number;
  results: Activity[];
}

export type InsertResponse = {
  id: string;
}

export type Activity = {
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
}

export type Bounds = {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

export type LatLng = {
  lat: number;
  lng: number;
}

export type Point = {
  time: Date;

  /** Represents the distance in meters since the beginning of the activity */
  distanceFromStart: number;

  /** Represents the pace in m/s for the particular point */
  pace: number;

  /** The elevation at the given point (relative to sea level (??)) */
  elevation: number;
  latLng: LatLng;
}

export type PointResponse = {
  id: string;
  points: Point[];
}

export type ActivityTypeAggregation = {
  // TODO(me): Convert to lower case once JSON is updated
  Name: string;
  Total: number;
}
