import { SportsLib } from "@sports-alliance/sports-lib";
import { DOMParser } from "xmldom";
import { Activity } from "../../common/types";
import { getImage } from "../../imageGenerator";
import { uploadToBucket } from "../../storage";
import { EventInterface } from "@sports-alliance/sports-lib/lib/events/event.interface";
import { generateTitle, getPolyline, getStatOrNull, getStreamData } from "./utils";

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
  const streamData = getStreamData(activity);

  let imageBuffer: Buffer;
  let imageName: string;
  if (positionData.length > 0) {
    imageBuffer = await getImage(positionData);
  }
  if (imageBuffer) {
    imageName =  filename.replace(/\.(?:gpx|tcx|fit)$/, '.png');
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
    simplePolyline: getPolyline(positionData, true),
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
    imageURL: imageName ? S3_URL + imageName : null
  };
};

export {
  mapFileToActivity
};