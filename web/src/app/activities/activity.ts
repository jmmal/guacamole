export interface GetAllResponse {
  totalCount: number;
  results: Activity[];
}

export interface InsertResponse {
  id: string;
}

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
}

export interface Bounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Point {
  time: Date;

  /** Represents the distance in meters since the beginning of the activity */
  distanceFromStart: number;

  /** Represents the pace in m/s for the particular point */
  pace: number;

  /** The elevation at the given point (relative to sea level (??)) */
  elevation: number;
  latLng: LatLng;
}

export interface PointResponse {
  id: string;
  points: Point[];
}

export interface ActivityTypeAggregation {
  // TODO(me): Convert to lower case once JSON is updated
  Name: string;
  Total: number;
}
