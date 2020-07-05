// Core Imports
import { Component, OnInit } from '@angular/core';

// App
import { ActivityService, Activity } from '../../core/activity.service';

@Component({
  selector: 'app-activity-detail-container',
  templateUrl: './activity-detail-container.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailContainerComponent implements OnInit {
  constructor(private service: ActivityService) {}

  activity: Activity = null;

  ngOnInit() {
    this.service.getRun("5f0168c70fc212b09aa32e7e")
      .subscribe((data) => {
        this.activity = data;
      })
  }
}
