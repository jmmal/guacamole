import React, { useEffect, useRef } from "react";

import * as mapboxgl from "mapbox-gl";
import * as mapboxPoly from "@mapbox/polyline";
import { createUseStyles } from "react-jss";

const getBoundingBox = (coords: any[]) => {
  const bbox = [
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ];

  return coords.reduce((prev, coord) => {
    return [
      Math.min(coord[0], prev[0]),
      Math.min(coord[1], prev[1]),
      Math.max(coord[0], prev[2]),
      Math.max(coord[1], prev[3]),
    ];
  }, bbox);
};

const useStyles = createUseStyles({
  map: {
    height: "25rem",
  },
});

type MapboxProps = {
  polyline: string;
};

export const Mapbox = ({ polyline }: MapboxProps) => {
  const mapContainer = useRef(null);
  const css = useStyles();

  useEffect(() => {
    setupMap();
  });

  const setupMap = (): void => {
    const geojson = mapboxPoly.toGeoJSON(polyline);
    const bounds = getBoundingBox(geojson.coordinates);

    const map = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/outdoors-v11",
      bounds: new mapboxgl.LngLatBounds(bounds),
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
    map.scrollZoom.disable();

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: geojson.coordinates,
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#008DD5",
          "line-width": 4,
        },
      });
    });
  };

  return <div ref={mapContainer} className={css.map}></div>;
};
