// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Services
import { ActivityService } from './activity.service';

// Components
import { UploadFormComponent } from './upload-form/upload-form.component';
import { ActivityListComponent } from './activity-list/activity-list.component';

// Modules
import { SharedModule } from '../shared/shared.module';
import { ActivityPreviewComponent } from './activity-preview/activity-preview.component';
import { DetailedActivityComponent } from './detailed-activity/detailed-activity.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ActivityListComponent,
    UploadFormComponent,
    ActivityPreviewComponent,
    DetailedActivityComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [
    ActivityService
  ],
  exports: [
    ActivityListComponent
  ]
})
export class ActivitiesModule { }
