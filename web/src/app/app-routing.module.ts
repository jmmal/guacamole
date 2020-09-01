// Core Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App Imports
import { UploadFormComponent } from './activities/upload-form/upload-form.component';
import { ActivityListComponent } from './activities/activity-list/activity-list.component';

const routes: Routes = [
  { path: 'upload', component: UploadFormComponent },
  { path: '**', component: ActivityListComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
