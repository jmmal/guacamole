import { SportsLib } from '@sports-alliance/sports-lib';
import polyline from '@mapbox/polyline';
import { DOMParser } from 'xmldom';
import { ActivityInterface } from '@sports-alliance/sports-lib/lib/activities/activity.interface';
import { DataPositionInterface } from '@sports-alliance/sports-lib/lib/data/data.position.interface';

const mapFileToActivity = async (key: string, file: string) => {
  const event = await SportsLib.importFromGPX(file, DOMParser);

  const distance = event.getDistance().getValue();
  const duration = event.getDuration().getValue();

  // TODO: Support multi activity files
  const activity = event.getFirstActivity();

  const pauseTime = getStatOrNull(activity, 'Pause Time') as number;
  const movingTime = getStatOrNull(activity, 'Moving time') as number;
  const positionData = activity.getPositionData();
  // const streams = activity.getAllStreams();
  // const streamData2 = activity.getStreamDataByDuration('Heart Rate');
  const streamData = activity.getStreamDataTypesBasedOnTime(['Heart Rate', 'Altitude', 'Cadence', 'Distance', 'Speed', 'Grade', 'Grade Adjusted Speed', 'Speed in meters per minute']);
  // console.log(streamData);

  // getPoints(positionalData);
  return {
    objectKey: key,
    title: activity.name,
    type: activity.type,
    startTime: event.startDate,
    endTime: event.endDate,
    pace: getStatOrNull(activity, 'Average Speed'),
    elapsedTime: (movingTime ?? 0) + (pauseTime ?? 0),
    movingTime: movingTime,
    polyline: getPolyline(positionData),
    minElevation: getStatOrNull(activity, 'Minimum Altitude'),
    maxElevation: getStatOrNull(activity, 'Maximum Altitude'),
    distance,
    duration,
    points: positionData,
    heartData: {
      max: getStatOrNull(activity, 'Maximum Heart Rate'),
      min: getStatOrNull(activity, 'Minimum Heart Rate'),
      avg: getStatOrNull(activity, 'Average Heart Rate'),
    },
    streamData 
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
}

export {
  mapFileToActivity
};