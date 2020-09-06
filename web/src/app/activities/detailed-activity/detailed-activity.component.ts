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

  // Chart data
  // TODO(me): Separate/common component
  elevationData: any[] = [];
  paceData: any[] = [];
  splitsData: any[] = [];

  // Chart optiosn
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
  yScaleMaxPace = 3;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  colorSchemePace = {
    domain: ['']
  };

  colorSchemeSplits = {
    domain: ['#4baeeb']
  }

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

  formatPce(metersPerSec: any): string {
    if (metersPerSec === 0) {
      return `0`;
    }

    const secondsPerKm = 1000 / metersPerSec;

    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = secondsPerKm - (minutes * 60);
    return `${minutes}:${Number(seconds).toFixed(0).padStart(2, '0' )} / km`;
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

    this.splitsData = this.buildSplits(points);
  }

  private buildSplits(points: Point[]): any[] {
    const data = [];

    let currentSplit = 1; // 1st KM
    let startTime = points[0].time;

    points.forEach((point, index) => {
      if (point.distanceFromStart < (currentSplit * 1000)) {
        return;
      }

      const seconds = (new Date(point.time).getTime() - new Date(startTime).getTime()) / 1000;

      console.log('Split:', currentSplit);
      console.log('Total seconds', seconds);
      data.push({
        name: `${currentSplit}km`,
        value: 1000 / seconds
      });
      currentSplit++;
      startTime = point.time;
    });

    const lastPoint = points[points.length - 1];
    const seconds = (new Date(lastPoint.time).getTime() - new Date(startTime).getTime()) / 1000;

    const dist = lastPoint.distanceFromStart - (1000 * (currentSplit - 1));

    // If the last split is less than 100m, ignore it
    if (dist < 100) {
      return data;
    }

    data.push({
      name: `${currentSplit}km`,
      value: seconds / dist
    });


    return data;
  }
}
