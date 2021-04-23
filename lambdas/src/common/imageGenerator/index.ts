import staticImageClient, {
  PathOverlay,
} from '@mapbox/mapbox-sdk/services/static';
import { GPSPoint } from '../types';
import fetch from 'node-fetch';
import { everyNthElement } from '../utils';

const API_KEY = process.env.MAPBOX_API_KEY;
const staticClient = staticImageClient({ accessToken: API_KEY });

type LngLat = [number, number];

const getCoords = (points: GPSPoint[], precision: number) => {
  const reduced = everyNthElement(points.filter(Boolean), precision);
  return reduced.map<LngLat>((coord) => {
    return [coord.longitudeDegrees, coord.latitudeDegrees];
  });
};
const getImage = async (points: GPSPoint[]): Promise<Buffer> => {
  let response;
  let precision = 1;
  do {
    const coords = getCoords(points, precision);
    const request = buildRequest(coords);
    precision += 2;

    // Sending the request with fetch rather than request.send() and static
    // image client did not seem to return the right format
    response = await fetch(request);
  } while (response.status === 413 && precision < 10);

  return response.buffer();
};

const buildRequest = (coords: LngLat[]): string => {
  const pathOverlay: PathOverlay = {
    path: {
      coordinates: coords,
      strokeWidth: 4,
      strokeColor: '#FF6700',
      strokeOpacity: 1,
    },
  };

  return staticClient
    .getStaticImage({
      ownerId: 'mapbox',
      styleId: 'outdoors-v11',
      width: 1280,
      height: 600,
      highRes: true,
      position: 'auto',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      padding: '30',
      overlays: [pathOverlay],
    })
    .url();
};

export { getImage };
