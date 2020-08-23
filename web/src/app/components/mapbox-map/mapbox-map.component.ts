// Core Imports
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

// Third Party Imports
import * as mapboxgl from 'mapbox-gl';
import * as polyline from '@mapbox/polyline';

// App Imports
import { environment } from 'src/environments/environment';
import { Activity } from 'src/app/core/activity';

@Component({
  selector: 'app-mapbox-map',
  templateUrl: './mapbox-map.component.html',
  styleUrls: ['./mapbox-map.component.scss'],
})
export class MapboxMapComponent implements OnInit, AfterViewInit {
  @Input() activity: Activity;

  map: mapboxgl.Map;

  @ViewChild('map') mapRef: ElementRef;

  ngOnInit(): void {
    if (!this.activity) {
      throw new TypeError('\'activity\' input must not be null or undefined\'');
    }
  }

  ngAfterViewInit(): void {
    this.setupMap();
  }

  private setupMap(): void {
    const map = new mapboxgl.Map({
      container: this.mapRef.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      bounds: new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(
          this.activity.bounds.minLng,
          this.activity.bounds.minLat
        ),
        new mapboxgl.LngLat(
          this.activity.bounds.maxLng,
          this.activity.bounds.maxLat
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
      accessToken: environment.mapBox.accessToken,
    });

    // Add map controls
    map.addControl(new mapboxgl.NavigationControl());

    const coords = polyline.toGeoJSON(this.activity.polyline);

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

    this.map = map;
  }
}
