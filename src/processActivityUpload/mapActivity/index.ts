import { SportsLib } from "@sports-alliance/sports-lib";
import polyline from "@mapbox/polyline";
import { DOMParser } from "xmldom";
import { ActivityInterface } from "@sports-alliance/sports-lib/lib/activities/activity.interface";
import { Activity } from "../../common/types";
import { DataPositionInterface } from "@sports-alliance/sports-lib/lib/data/data.position.interface";
import { getImage } from "../../imageGenerator";
import { uploadToBucket } from "../../storage";
import { EventInterface } from "@sports-alliance/sports-lib/lib/events/event.interface";

const S3_URL = process.env.S3_URL;


const mapFileToActivity = async (filename: string, file: Buffer): Promise<Activity> => {
  let event: EventInterface;
  const filestring = file.toString();

  try {
    if (filename.match(".fit$")) {
      event = await SportsLib.importFromFit(file);
    } else if (filename.match(".gpx$")) {
      event = await SportsLib.importFromGPX(filestring, DOMParser); 
    } else if (filename.match(".tcx$")) {
      event = await SportsLib.importFromTCX((new DOMParser()).parseFromString(filestring, 'application/xml'));
    } else {
      return null;
    }
  } catch {
    return null;
  }


  const distance = event.getDistance().getValue();
  const duration = event.getDuration().getValue();

  // TODO: Support multi activity files
  const activity = event.getFirstActivity();

  const pauseTime = getStatOrNull(activity, "Pause Time") as number;
  const movingTime = getStatOrNull(activity, "Moving time") as number;
  const positionData = activity.hasPositionData() ? activity.getPositionData() : [];
  const streamData = activity.getStreamDataTypesBasedOnTime(["Heart Rate", "Altitude", "Cadence", "Distance", "Speed", "Grade", "Grade Adjusted Speed", "Speed in meters per minute"]);

  let imageBuffer: Buffer;
  let imageName: string;
  if (positionData.length > 0) {
    imageBuffer = await getImage(positionData);
  }
  if (imageBuffer) {
    imageName =  filename.replace(/\.(?:gpx|tcx)$/, '.png');
    await uploadToBucket(imageName, imageBuffer);
  }

  return {
    objectKey: filename,
    title: activity.name === '' ? generateTitle(activity.startDate, activity.type) : activity.name, 
    type: activity.type,
    startTime: event.startDate,
    endTime: event.endDate,
    pace: {
      avg: getStatOrNull(activity, "Average Pace"),
      min: getStatOrNull(activity, "Minimum Pace"),
      max: getStatOrNull(activity, "Maximum Pace"),
    },
    elapsedTime: (movingTime ?? 0) + (pauseTime ?? 0),
    movingTime: movingTime,
    polyline: getPolyline(positionData),
    elevation: {
      min: getStatOrNull(activity, "Minimum Altitude"),
      max: getStatOrNull(activity, "Maximum Altitude"),
      avg: getStatOrNull(activity, "Average Altitude"),
    },
    calories: getStatOrNull(activity, 'Energy'),
    ascent: getStatOrNull(activity, 'Ascent'),
    descent: getStatOrNull(activity, 'Descent'),
    distance,
    duration,
    points: positionData,
    heartRate: {
      max: getStatOrNull(activity, "Maximum Heart Rate"),
      min: getStatOrNull(activity, "Minimum Heart Rate"),
      avg: getStatOrNull(activity, "Average Heart Rate"),
    },
    streamData,
    imageURL: S3_URL + imageName
  };
};

function getPolyline(data: DataPositionInterface[]) {
  const points = data
    .filter(Boolean)
    .map(({ latitudeDegrees, longitudeDegrees }) => {
      return [latitudeDegrees, longitudeDegrees];
    });

   return polyline.encode(points as [number, number][]);
}

const getStatOrNull = (activity: ActivityInterface, type: string) => {
  const stat = activity.getStat(type);

  return stat ? stat.getValue() : null;
};

const ActivityTypeMap: Map<string, string> = new Map([
  ['Running', 'Run' ],
  ['Cycling', 'Ride'],
  ['Hiking' , 'Hike'],
]);

const generateTitle = (start: Date, type: string): string => {
  const hourOfDay = start.getHours();
  let timeOfDayString = 'Morning';
  if (hourOfDay >= 12) {
    timeOfDayString = 'Lunch';
  } else if (hourOfDay >= 14) {
    timeOfDayString = 'Afternoon';
  } else if (hourOfDay >= 16) {
    timeOfDayString = 'Evening';
  } else if (hourOfDay >= 21) {
    timeOfDayString = 'Night';
  }

  const activityString = ActivityTypeMap.get(type) ?? 'Workout';

  return `${timeOfDayString} ${activityString}`;
};

export {
  mapFileToActivity,
  generateTitle
};