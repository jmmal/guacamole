import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapboxMapComponent } from './mapbox-map.component';
import { Activity } from 'src/app/core/activity';

const activity: Activity = {
  id: '1234',
  title: 'Morning run',
  type: 'Running',
  distance: 1000,
  startTime: new Date(),
  endTime: new Date(),
  pace: 200,
  elapsedTime: 200,
  movingTime: 200,
  polyline: 'abcd',
  locations: [],
  bounds: {
    maxLat: 80,
    maxLng: 80,
    minLat: 80,
    minLng: 80
  },
  minElevation: 23,
  maxElevation: 10,
  image: ''
};

describe('MapboxMapComponent', () => {
  let component: MapboxMapComponent;
  let fixture: ComponentFixture<MapboxMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapboxMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapboxMapComponent);
    component = fixture.componentInstance;
    component.activity = activity;
    fixture.detectChanges();
  });
});
