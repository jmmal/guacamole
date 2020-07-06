// Core Imports
import { Component, OnInit } from '@angular/core';

// Third Party Imports
import { SubSink } from 'subsink';

// App Imports
import { ActivityService, Activity } from './core/activity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: Activity;

  private subs = new SubSink();

  constructor(private service: ActivityService) {}

  ngOnInit(): void {
    this.subs.sink = this.service
      .getRun('5f00379c0fc212b09aa31ab0')
      .subscribe(run => {
        this.data = run;
      });
  }
}
