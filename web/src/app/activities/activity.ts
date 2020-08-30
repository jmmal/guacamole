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
