const fs = require('fs');
const path = require('path');

const { mapFileToActivity } = require('./index');

test('Can map an gpx file to an activity', async () => {
  const eventFile = fs.readFileSync(path.resolve(path.resolve(), 'test.gpx'), 'utf8');

  const result = await mapFileToActivity('test.gpx', eventFile);

  expect(result.objectKey).toBe('test.gpx');
  expect(result.title).toBe('Wolli Creek - Turrella');
  expect(result.type).toBe('Running');
  expect(result.distance).toBe(5041.199999999996);
  expect(result.duration).toBe(2259);
  expect(result.startTime.toISOString()).toBe("2021-04-05T00:54:06.000Z");
  expect(result.endTime.toISOString()).toBe("2021-04-05T01:31:45.000Z");
  expect(result.pace).toBe(2.2562248995983594);
  expect(result.elapsedTime).toBe(2259);
  expect(result.movingTime).toBe(2259);
  expect(result.polyline).toMatch('tpanEasqy[BA@?BABA@?BABA@AB?');
  expect(result.minElevation).toBe(3);
  expect(result.maxElevation).toBe(11.7);
  expect(result.points.length).toBe(2260);
  expect(result.heartData.max).toBe(183);
  expect(result.heartData.min).toBe(122);
  expect(result.heartData.avg).toBe(167.98125836680055);
})