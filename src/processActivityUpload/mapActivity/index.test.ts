import fs from "fs";
import path from "path";
import { Activity } from "../../common/types";

import { mapFileToActivity } from "./index";
import { generateTitle } from "./utils";

const printWithoutStreamData = (activity) => {
  const printer: Activity = {
    ...activity,
    streamData: [],
    points: []
  };

  console.log(printer);
};

describe('mapActivity()', () => {
  test("should map an gpx file with GPS data to an activity", async () => {
    const eventFile = fs.readFileSync(path.resolve(path.resolve("samples"), "gpx-with-points.gpx"));
  
    const result = await mapFileToActivity("gpx-with-points.gpx", eventFile);
  
    expect(result.objectKey).toBe("gpx-with-points.gpx");
    expect(result.title).toBe("Wolli Creek - Beaman Park");
    expect(result.type).toBe("Running");
    expect(result.distance).toBe(8662.400000000032);
    expect(result.duration).toBe(3751);
    expect(result.startTime.toISOString()).toBe("2021-04-10T01:12:57.000Z");
    expect(result.endTime.toISOString()).toBe("2021-04-10T02:15:28.000Z");
    expect(result.pace.avg).toBe(420.3888596952214);
    expect(result.pace.max).toBe(381.6793893129771);
    expect(result.pace.min).toBe(Infinity);
    expect(result.elapsedTime).toBe(3751);
    expect(result.movingTime).toBe(3751);
    expect(result.polyline).toMatch("lpanEyrqy[BABABABABABABABABADA");
    expect(result.simplePolyline).toMatch("lpanEyrqy[JEJEJELGJEJGJGLGJELG");
    expect(result.elevation.min).toBe(2.9);
    expect(result.elevation.max).toBe(11.6);
    expect(result.elevation.avg).toBe(6.176835853131734);
    expect(result.points.length).toBe(3752);
    expect(result.heartRate.max).toBe(186);
    expect(result.heartRate.min).toBe(111);
    expect(result.heartRate.avg).toBe(173.91684665226782);
    expect(result.calories).toBeNull();
    expect(result.ascent).toBe(39.6);
    expect(result.descent).toBe(45.6);
  });
  
  test("should map an tcx file with GPS data to an activity", async () => {
    const file = fs.readFileSync(path.resolve(path.resolve("samples"), "tcx-with-points.tcx"));
  
    const result = await mapFileToActivity("tcx-with-points.tcx", file);

    expect(result.objectKey).toBe("tcx-with-points.tcx");
    expect(result.title).toBe("Morning Run");
    expect(result.type).toBe("Running");
    expect(result.distance).toBe(8589.537999999999);
    expect(result.duration).toBe(3695.0050000000006);
    expect(result.startTime.toISOString()).toBe("2021-04-10T01:12:56.000Z");
    expect(result.endTime.toISOString()).toBe("2021-04-10T02:15:28.806Z");
    expect(result.pace.avg).toBe(422.7305803165167);
    expect(result.pace.max).toBe(294.9852507374631);
    expect(result.pace.min).toBe(1538.4615384615383);
    expect(result.elapsedTime).toBe(3695.0050000000006);
    expect(result.movingTime).toBe(3695.0050000000006);
    expect(result.polyline).toMatch("lpanEyrqy[BABABABABABABABABADA");
    expect(result.simplePolyline).toMatch("tpanE}rqy[JEJELGJEJGJEJGLGJGLE");
    expect(result.elevation.min).toBe(2.85);
    expect(result.elevation.max).toBe(11.628);
    expect(result.elevation.avg).toBe(6.176718128025823);
    expect(result.points.length).toBe(3754);
    expect(result.heartRate.max).toBe(186);
    expect(result.heartRate.min).toBe(111);
    expect(result.heartRate.avg).toBe(173.91904249596558);
    expect(result.calories).toBe(819);
    expect(result.ascent).toBe(40.196);
    expect(result.descent).toBe(42.81100000000001);
  });

  test("should not map an gpx file with no GPS data", async () => {
    const file = fs.readFileSync(path.resolve(path.resolve("samples"), "no-points.gpx"));
  
    const result = await mapFileToActivity("no-points.gpx", file);
  
    expect(result).toBeNull();
  });

  test("should map an tcx file with no GPS data", async () => {
    const file = fs.readFileSync(path.resolve(path.resolve("samples"), "tcx-no-points.tcx"));
  
    const result = await mapFileToActivity("tcx-no-points.tcx", file);

    expect(result.objectKey).toBe("tcx-no-points.tcx");
    expect(result.title).toBe("Morning Workout");
    expect(result.type).toBe("Other");
    expect(result.distance).toBe(0);
    expect(result.duration).toBe(1873.114);
    expect(result.startTime.toISOString()).toBe("2020-01-12T19:52:33.000Z");
    expect(result.endTime.toISOString()).toBe("2020-01-12T20:23:46.114Z");
    expect(result.pace.avg).toBeNull();
    expect(result.pace.max).toBeNull();
    expect(result.pace.min).toBeNull();
    expect(result.elapsedTime).toBe(0);
    expect(result.movingTime).toBeNull();
    expect(result.polyline).toMatch("");
    expect(result.simplePolyline).toMatch("");
    expect(result.elevation.min).toBeNull();
    expect(result.elevation.max).toBeNull();
    expect(result.elevation.avg).toBeNull();
    expect(result.points.length).toBe(0);
    expect(result.heartRate.max).toBe(188);
    expect(result.heartRate.min).toBe(94);
    expect(result.heartRate.avg).toBe(169.27472527472528);
    expect(result.calories).toBe(476);
    expect(result.ascent).toBeNull();
    expect(result.descent).toBeNull();
  });
  test("should map an fit file with GPS data", async () => {
    const file = fs.readFileSync(path.resolve(path.resolve("samples"), "fit-with-points.fit"), null);
  
    const result = await mapFileToActivity("fit-with-points.fit", file);

    expect(result.objectKey).toBe("fit-with-points.fit");
    expect(result.title).toBe("Morning Run");
    expect(result.type).toBe("Running");
    expect(result.distance).toBe(8589.54);
    expect(result.duration).toBe(3704.396);
    expect(result.startTime.toISOString()).toBe("2021-04-10T01:12:56.000Z");
    expect(result.endTime.toISOString()).toBe("2021-04-10T02:15:28.000Z");
    expect(result.pace.avg).toBe(431.22035360069);
    expect(result.pace.max).toBe(181.68604651162792);
    expect(result.pace.min).toBe(Infinity);
    expect(result.elapsedTime).toBe(3384.083);
    expect(result.movingTime).toBe(3336.396);
    expect(result.polyline).toMatch("lpanEyrqy[BABABABABABABA");
    expect(result.simplePolyline).toMatch("tpanE}rqy[JEJELGJEJGJEJGLGJGLE");
    expect(result.elevation.min).toBe(2.8);
    expect(result.elevation.max).toBe(11.6);
    expect(result.elevation.avg).toBe(6.173380129589637);
    expect(result.points.length).toBe(3753);
    expect(result.heartRate.max).toBe(186);
    expect(result.heartRate.min).toBe(111);
    expect(result.heartRate.avg).toBe(175);
    expect(result.calories).toBe(819);
    expect(result.ascent).toBe(22);
    expect(result.descent).toBe(50);
  });
  test("should map an fit file with no GPS data", async () => {
    const file = fs.readFileSync(path.resolve(path.resolve("samples"), "fit-no-points.fit"), null);
  
    const result = await mapFileToActivity("fit-no-points.fit", file);

    expect(result.objectKey).toBe("fit-no-points.fit");
    expect(result.title).toBe("Morning Workout");
    expect(result.type).toBe("Fitness Equipment");
    expect(result.distance).toBe(965.46);
    expect(result.duration).toBe(882.303);
    expect(result.startTime.toISOString()).toBe("2021-04-01T22:10:52.000Z");
    expect(result.endTime.toISOString()).toBe("2021-04-01T22:25:35.000Z");
    expect(result.pace.avg).toBe(914.0767824497257);
    expect(result.pace.max).toBe(Infinity);
    expect(result.pace.min).toBeNull();
    expect(result.elapsedTime).toBe(0);
    expect(result.movingTime).toBeNull();
    expect(result.polyline).toMatch("");
    expect(result.simplePolyline).toMatch("");
    expect(result.elevation.min).toBeNull();
    expect(result.elevation.max).toBeNull();
    expect(result.elevation.avg).toBeNull();
    expect(result.points.length).toBe(0);
    expect(result.heartRate.max).toBe(187);
    expect(result.heartRate.min).toBe(106);
    expect(result.heartRate.avg).toBe(162);
    expect(result.calories).toBe(181);
    expect(result.ascent).toBeNull();
    expect(result.descent).toBeNull();
  });
});

describe.only('generateTitle()', () => {
  [
    { date: new Date("2020-01-12T19:52:33Z"), type: "Running", expected: "Evening Run" },
    { date: new Date("2020-01-12T19:52:33Z"), type: "Cycling", expected: "Evening Ride" },
    { date: new Date("2020-01-12T19:52:33Z"), type: "Hiking", expected: "Evening Hike" },
    { date: new Date("2020-01-12T19:52:33"), type: "Running", expected: "Evening Run" },
  ].forEach(testCase => {
    test('should correctly generate a title string', () => {
      const result = generateTitle(testCase.date, testCase.type);
  
      expect(result).toBe(testCase.expected);
    });
  });
});
