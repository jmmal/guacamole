import fs from "fs";
import path from "path";
import { Activity } from "../../common/types";

import { mapFileToActivity } from "./index";

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
    const eventFile = fs.readFileSync(path.resolve(path.resolve("samples"), "gpx-with-points.gpx"), "utf8");
  
    const result = await mapFileToActivity("gpx-with-points.gpx", eventFile);
  
    expect(result.objectKey).toBe("gpx-with-points.gpx");
    expect(result.title).toBe("Wolli Creek - Beaman Park");
    expect(result.type).toBe("Running");
    expect(result.distance).toBe(8662.400000000032);
    expect(result.duration).toBe(3751);
    expect(result.startTime.toISOString()).toBe("2021-04-10T01:12:57.000Z");
    expect(result.endTime.toISOString()).toBe("2021-04-10T02:15:28.000Z");
    expect(result.pace).toBe(2.378749999999981);
    expect(result.elapsedTime).toBe(3751);
    expect(result.movingTime).toBe(3751);
    expect(result.polyline).toMatch("lpanEyrqy[BABABABABABABABABADA");
    expect(result.minElevation).toBe(2.9);
    expect(result.maxElevation).toBe(11.6);
    expect(result.points.length).toBe(3752);
    expect(result.heartRate.max).toBe(186);
    expect(result.heartRate.min).toBe(111);
    expect(result.heartRate.avg).toBe(173.91684665226782);
  });
  
  test("should map an tcx file with GPS data to an activity", async () => {
    const fileString = fs.readFileSync(path.resolve(path.resolve("samples"), "tcx-with-points.tcx"), "utf8");
  
    const result = await mapFileToActivity("tcx-with-points.tcx", fileString);
 
    expect(result.objectKey).toBe("tcx-with-points.tcx");
    expect(result.title).toBe("");
    expect(result.type).toBe("Running");
    expect(result.distance).toBe(8589.537999999999);
    expect(result.duration).toBe(3695.0050000000006);
    expect(result.startTime.toISOString()).toBe("2021-04-10T01:12:56.000Z");
    expect(result.endTime.toISOString()).toBe("2021-04-10T02:15:28.806Z");
    expect(result.pace).toBe(2.3655728886499214);
    expect(result.elapsedTime).toBe(3695.0050000000006);
    expect(result.movingTime).toBe(3695.0050000000006);
    expect(result.polyline).toMatch("lpanEyrqy[BABABABABABABABABADA");
    expect(result.minElevation).toBe(2.85);
    expect(result.maxElevation).toBe(11.628);
    expect(result.points.length).toBe(3754);
    expect(result.heartRate.max).toBe(186);
    expect(result.heartRate.min).toBe(111);
    expect(result.heartRate.avg).toBe(173.91904249596558);
  });

  test("should not map an gpx file with no GPS data", async () => {
    const fileString = fs.readFileSync(path.resolve(path.resolve("samples"), "no-points.gpx"), "utf8");
  
    const result = await mapFileToActivity("no-points.gpx", fileString);
  
    expect(result).toBeNull();
  });

  test("should map an tcx file with no GPS data", async () => {
    const fileString = fs.readFileSync(path.resolve(path.resolve("samples"), "tcx-no-points.tcx"), "utf8");
  
    const result = await mapFileToActivity("tcx-no-points.tcx", fileString);
    
    printWithoutStreamData(result);

    expect(result.objectKey).toBe("tcx-no-points.tcx");
    expect(result.title).toBe("");
    expect(result.type).toBe("Other");
    expect(result.distance).toBe(0);
    expect(result.duration).toBe(1873.114);
    expect(result.startTime.toISOString()).toBe("2020-01-12T19:52:33.000Z");
    expect(result.endTime.toISOString()).toBe("2020-01-12T20:23:46.114Z");
    expect(result.pace).toBeNull();
    expect(result.elapsedTime).toBe(0);
    expect(result.movingTime).toBeNull();
    expect(result.polyline).toMatch("");
    expect(result.minElevation).toBeNull();
    expect(result.maxElevation).toBeNull();
    expect(result.points.length).toBe(0);
    expect(result.heartRate.max).toBe(188);
    expect(result.heartRate.min).toBe(94);
    expect(result.heartRate.avg).toBe(169.27472527472528);
  });
});
