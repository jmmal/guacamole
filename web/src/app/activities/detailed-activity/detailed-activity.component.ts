import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubSink } from 'subsink';
import { EChartOption } from 'echarts';

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

  activity: Activity;

  elevations: EChartOption;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.subs.sink = this.activityService.getRun(this.id).subscribe(resp => {
      this.activity = resp;
    });

    this.subs.sink = this.activityService.getPoints(this.id).subscribe(resp => {
      this.processPoints(resp.points);
    });
  }

  private processPoints(points: Point[]): void {
    this.elevations = {
      xAxis: {
        type: 'category',
        data: points.map(point => Math.floor(point.distanceFromStart))
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: points.map(point => point.elevation),
          type: 'bar'
        }
      ]
    };
  }
}
