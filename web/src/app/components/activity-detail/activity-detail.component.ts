// Core Imports
import { Component, Input } from '@angular/core';

// App
import { Activity } from 'src/app/core/activity.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent {
  @Input() activity: Activity;
}
