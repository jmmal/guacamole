// Core Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App Imports
import { UploadFormComponent } from './activities/upload-form/upload-form.component';
import { ActivityListComponent } from './activities/activity-list/activity-list.component';
import { DetailedActivityComponent } from './activities/detailed-activity/detailed-activity.component';

const routes: Routes = [
  { path: 'upload', component: UploadFormComponent },
  { path: 'activities', component: ActivityListComponent },
  { path: 'activities/:id', component: DetailedActivityComponent },
  { path: '**', component: ActivityListComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
