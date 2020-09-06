import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubSink } from 'subsink';

import { ActivityService } from '../activity.service';
import { Activity, Point } from '../activity';

@Component({
  selector: 'app-detailed-activity',
  templateUrl: './detailed-activity.component.html',
  styleUrls: ['./detailed-activity.component.scss']
})
export class DetailedActivityComponent implements OnInit {
  private id: string;
  private subs = new SubSink();

  loading = true;
  activity: Activity;

  elevationData: any[] = [];
  paceData: any[] = [];
  legend = false;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Distance';
  yAxisLabel = 'Elevation';
  timeline = true;
  yScaleMin = Number.MAX_SAFE_INTEGER;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  colorSchemePace = {
    domain: ['']
  };

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.subs.sink = this.activityService.getRun(this.id).subscribe(resp => {
      this.activity = resp;
      this.loading = false;
    });

    this.subs.sink = this.activityService.getPoints(this.id).subscribe(resp => {
      this.processPoints(resp.points);
    });
  }

  formatXAxis(v: any): string {
    return `${Number(v).toFixed(1)} km`;
  }

  formatYAxis(v: any): string {
    return `${v} m`;
  }

  metresPerSecondToMinutesPerKm(metersPerSec: number): number {
    if (metersPerSec === 0) {
      return 0;
    }

    const secondsPerKm = 1000 / metersPerSec;

    console.log(secondsPerKm / 60);
    return secondsPerKm / 60;
  }

  private processPoints(points: Point[]): void {
    const data = [];
    const paces = [];

    points.forEach((point, i) => {
      data.push({
        // TODO: Maybe be better to label with time
        name: `${point.distanceFromStart / 1000}`,
        value: point.elevation
      });

      paces.push({
        name: `${point.distanceFromStart / 1000}`,
        value: point.pace
      });

      if (point.elevation < this.yScaleMin) {
        this.yScaleMin = point.elevation - 2;
      }
    });

    this.elevationData = [
      {
        name: `Elevations`,
        series: data
      }
    ];

    this.paceData = [
      {
        name: 'Pace',
        series: paces
      }
    ];
  }
}
