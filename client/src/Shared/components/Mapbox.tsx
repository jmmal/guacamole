import { useCallback, useEffect, useRef } from "react";

import { useTheme } from "@primer/react";

/**
 * '!mapbox-gl' is a workaround to ES6 compilation errors.
 * @see https://github.com/mapbox/mapbox-gl-js/issues/10565
 */
// @ts-ignore
// eslint-disable-next-line
import mapboxgl from "!mapbox-gl";
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
  const theme = useTheme();

  const setupMap = useCallback(() => {
    const geojson = mapboxPoly.toGeoJSON(polyline);
    const bounds = getBoundingBox(geojson.coordinates);
    const mapStyle =
      theme.colorMode === "night"
        ? "mapbox://styles/mapbox/dark-v10"
        : "mapbox://styles/mapbox/outdoors-v11";

    const map = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: mapStyle,
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
  }, [theme.colorMode, polyline]);

  useEffect(() => {
    setupMap();
  }, [setupMap]);

  return <div ref={mapContainer} className={css.map}></div>;
};
