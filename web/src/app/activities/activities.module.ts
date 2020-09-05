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
import { NgxEchartsModule } from 'ngx-echarts';

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
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [
    ActivityService
  ],
  exports: [
    ActivityListComponent
  ]
})
export class ActivitiesModule { }
