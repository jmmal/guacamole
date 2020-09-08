import React, { useEffect, useRef } from 'react';

import * as mapboxgl from 'mapbox-gl';
import * as mapboxPoly from '@mapbox/polyline';

import { Bounds } from '../Activities/models';

type MapboxProps = {
  bounds: Bounds;
  polyline: string;
}

export const Mapbox = ({ bounds, polyline }: MapboxProps) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    setupMap();
  });

  const setupMap = (): void => {
    const map = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      bounds: new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(
          bounds.minLng,
          bounds.minLat
        ),
        new mapboxgl.LngLat(
          bounds.maxLng,
          bounds.maxLat
        )
      ),
      fitBoundsOptions: {
        padding: {
          top: 40,
          bottom: 40,
          left: 40,
          right: 40,
        },
      },
      accessToken: process.env.REACT_APP_MAPBOX_PUBLIC_KEY,
    });

    // Add map controls
    map.addControl(new mapboxgl.NavigationControl());

    const coords = mapboxPoly.toGeoJSON(polyline);

    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coords.coordinates,
          },
        },
      });
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#008DD5',
          'line-width': 4,
        },
      });
    });
  }

  return (
    <div ref={mapContainer} className="map match-parent"></div>
  )
}