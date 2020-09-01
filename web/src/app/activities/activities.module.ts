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

@NgModule({
  declarations: [
    ActivityListComponent,
    UploadFormComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    RouterModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    ActivityService
  ],
  exports: [
    ActivityListComponent
  ]
})
export class ActivitiesModule { }
