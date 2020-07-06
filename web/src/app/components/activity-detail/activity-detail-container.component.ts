// Core Imports
import { Component, OnInit } from '@angular/core';

// App
import { ActivityService, Activity } from '../../core/activity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-detail-container',
  templateUrl: './activity-detail-container.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailContainerComponent implements OnInit {
  constructor(
    private service: ActivityService,
    private route: ActivatedRoute
  ) {}

  activity: Activity = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.getRun(id)
      .subscribe((data) => {
        this.activity = data;
      });
  }
}
