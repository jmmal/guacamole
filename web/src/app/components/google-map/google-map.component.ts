// Core
import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';

// App
import { Activity } from 'src/app/core/activity.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {
  polylineOptions = {
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  }

  @Input() activity: Activity;

  @ViewChild('map') map: google.maps.Map;

  ngOnInit() {
    if (!this.activity) {
      throw new TypeError("'activity' must not be null");
    }
  }

  get path(): google.maps.LatLng[] {
    return google.maps.geometry.encoding.decodePath(this.activity.polyline);
  }


  ngAfterViewInit() {
    const min = new google.maps.LatLng(this.activity.bounds.minLat, this.activity.bounds.minLng);
    const max = new google.maps.LatLng(this.activity.bounds.maxLat, this.activity.bounds.maxLng);

    const bounds = new google.maps.LatLngBounds(min, max);
    if (this.map) {
      this.map.fitBounds(bounds);
    }
  }
}
