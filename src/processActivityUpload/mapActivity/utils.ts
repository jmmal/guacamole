import polyline from "@mapbox/polyline";
import { ActivityInterface } from "@sports-alliance/sports-lib/lib/activities/activity.interface";
import { DataPositionInterface } from "@sports-alliance/sports-lib/lib/data/data.position.interface";

import { DataStreamPoint, StatValue } from "../../common/types";

const getStreamData = (activity: ActivityInterface): DataStreamPoint[] => {
  const stream = activity.getStreamDataTypesBasedOnTime([
    "Heart Rate",
    "Altitude",
    "Cadence",
    "Distance",
    "Speed",
    "Grade",
    "Grade Adjusted Speed",
    "Speed in meters per minute"
  ]);

  return Object.keys(stream).map(key => {
    const entry = stream[+key];

    if (!entry) {
      return;
    }

    return {
      time: new Date(+key),
      heartRate: stream[+key]['Heart Rate'],
      altitude: stream[+key]['Altitude'],
      cadence: stream[+key]['Cadence'],
      distance: stream[+key]['Distance'],
      speed: stream[+key]['Speed'],
      grade: stream[+key]['Grade'],
      gradeAdjustedSpeed: stream[+key]['Grade Adjusted Speed'],
      speedInMPM: stream[+key]['Speed in meters per minute'],
    };
  });
};

const getPolyline = (data: DataPositionInterface[], reduced?: boolean): string => {
  if (reduced) {
    const newData = [];
    for(let i = 0; i < data.length; i += 3) {
      newData.push(data[i]);
    }
    data = newData;
  }

  const points = data
    .filter(Boolean)
    .map(({ latitudeDegrees, longitudeDegrees }) => {
      return [latitudeDegrees, longitudeDegrees];
    });

   return polyline.encode(points as [number, number][]);
};

const getStatOrNull = (activity: ActivityInterface, type: string): StatValue => {
  const stat = activity.getStat(type);

  return stat ? stat.getValue() : null;
};

const ActivityTypeMap: Map<string, string> = new Map([
  ['Running', 'Run' ],
  ['Cycling', 'Ride'],
  ['Hiking' , 'Hike'],
]);

const generateTitle = (start: Date, type: string): string => {
  const hourOfDay = start.getUTCHours();
  let timeOfDayString = 'Morning';
  if (hourOfDay >= 12) {
    timeOfDayString = 'Lunch';
  }
  if (hourOfDay >= 14) {
    timeOfDayString = 'Afternoon';
  }
  if (hourOfDay >= 16) {
    timeOfDayString = 'Evening';
  }
  if (hourOfDay >= 21) {
    timeOfDayString = 'Night';
  }

  const activityString = ActivityTypeMap.get(type) ?? 'Workout';

  return `${timeOfDayString} ${activityString}`;
};


export {
  getStreamData,
  generateTitle,
  getStatOrNull,
  getPolyline
};