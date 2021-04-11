import { DataPositionInterface } from "@sports-alliance/sports-lib/lib/data/data.position.interface";

export type GPSPoint = {
  latitudeDegrees: number;
  longitudeDegrees: number;
}

export type HeartRate = {
  min: StatValue;
  max: StatValue;
  avg: StatValue;
}

export type DataStreamPoint = {
  [type: number]: {
      [type: string]: number;
  };
}

export type StatValue = string | number | boolean | DataPositionInterface | string[];

export type Activity = {
  objectKey: string;
  title: string;
  type: string;
  startTime: Date;
  endTime: Date;
  pace: StatValue;
  elapsedTime: number;
  movingTime: number;
  polyline: string;
  minElevation: StatValue;
  maxElevation: StatValue;
  distance: number;
  duration: number;
  points: GPSPoint[];
  heartRate: HeartRate;
  streamData: DataStreamPoint;
};
