const { SportsLib } = require('@sports-alliance/sports-lib');
const polyline = require('@mapbox/polyline');
const { DOMParser } = require('xmldom');

exports.mapFileToActivity = async (key, file) => {
  try {
    const event = await SportsLib.importFromGPX(file, DOMParser);

    const distance = event.getDistance().getValue();
    const duration = event.getDuration().getValue();

    // TODO: Support multi activity files
    const activity = event.getFirstActivity();

    const pauseTime = activity.getStat('Pause Time').getValue();
    const movingTime = activity.getStat('Moving time').getValue();
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
      pace: activity.getStat('Average Speed').getValue(),
      elapsedTime: movingTime + pauseTime,
      movingTime: movingTime,
      polyline: getPolyline(positionData),
      minElevation: activity.getStat('Minimum Altitude').getValue(),
      maxElevation: activity.getStat('Maximum Altitude').getValue(),
      distance,
      duration,
      points: positionData,
      heartData: {
        max: activity.getStat('Maximum Heart Rate').getValue(),
        min: activity.getStat('Minimum Heart Rate').getValue(),
        avg: activity.getStat('Average Heart Rate').getValue(),
      },
      streamData 
    };
  } catch (err) {
    throw new Error('Error converting GPX', err);
  }
};

function getPolyline(data) {
  const points = data
    .filter(Boolean)
    .map(({ latitudeDegrees, longitudeDegrees }) => {
      return [latitudeDegrees, longitudeDegrees];
    });

   return polyline.encode(points)
}