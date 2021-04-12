import { DataPositionInterface } from "@sports-alliance/sports-lib/lib/data/data.position.interface";

export type GPSPoint = {
  latitudeDegrees: number;
  longitudeDegrees: number;
}

export type MinMaxAvg = {
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
  pace: MinMaxAvg;
  calories: StatValue;
  elapsedTime: number;
  movingTime: number;
  polyline: string;
  elevation: MinMaxAvg;
  ascent: StatValue;
  descent: StatValue;
  distance: number;
  duration: number;
  points: GPSPoint[];
  heartRate: MinMaxAvg;
  streamData: DataStreamPoint;
  imageURL: string;
};
