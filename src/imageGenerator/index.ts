import { MapiResponse } from '@mapbox/mapbox-sdk/lib/classes/mapi-response';
import staticImageClient, { PathOverlay } from '@mapbox/mapbox-sdk/services/static';
import { GPSPoint } from '../common/types';
import fetch from 'node-fetch';

const API_KEY = process.env.MAPBOX_API_KEY;
const staticClient = staticImageClient({ accessToken: API_KEY });

type LngLat = [number, number]

const getImage = (points: GPSPoint[]): Promise<Buffer> => {
  const reduced = [];
  const filtered = points.filter(Boolean);
  for(let i = 0; i < filtered.length; i += 3) {
    reduced.push(filtered[i]);
  }

  const coords = reduced.map<LngLat>(coord => {
    return [coord.longitudeDegrees, coord.latitudeDegrees];
  });

  const pathOverlay: PathOverlay = {
    path: {
      coordinates: coords,
      strokeWidth: 4,
      strokeColor: '#FF6700',
      strokeOpacity: 1
    }
  };
  
  const request = staticClient.getStaticImage({
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
  });

  // Sending the request with fetch rather than request.send() and static 
  // image client did not seem to return the right format
  return fetch(request.url())
    .then(resp => resp.buffer());
};

export {
  getImage
};