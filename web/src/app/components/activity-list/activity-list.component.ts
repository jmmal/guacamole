import { Component, OnInit } from '@angular/core';

import { SubSink } from 'subsink';
import { ActivityService, GetAllResponse } from 'src/app/core/activity.service';

@Component({
  selector: 'app-activity-list',
  styleUrls: [ './activity-list.component.scss' ],
  templateUrl: './activity-list.component.html'
})
export class ActivityListComponent implements OnInit {
  activities: GetAllResponse;

  private subs = new SubSink();
  private pagen = 1;

  get page(): number { return this.pagen; }
  set page(v: number) {
    this.pagen = v;
    this.reloadActivities();
  }

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.reloadActivities();
  }

  private reloadActivities(): void {
    // Update service to use switchMap
    this.subs.sink = this.activityService
      .getAllRuns(20, this.page)
      .subscribe(response => {
        this.activities = response;
      });
  }

  onPageChange(page): void {
    this.page = page;
  }
}
