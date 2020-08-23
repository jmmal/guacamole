import { Component, OnInit, OnDestroy } from '@angular/core';

import { SubSink } from 'subsink';

import { ActivityService } from '../../core/activity.service';
import { Activity } from '../../core/activity';

@Component({
  selector: 'app-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.scss']
})
export class ActivityPreviewComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  runs: Activity[];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.subs.sink = this.activityService
      .getAllRuns()
      .subscribe(resp => {
        this.runs = resp.results;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
