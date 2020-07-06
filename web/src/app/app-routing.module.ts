import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { ActivityDetailContainerComponent } from './components/activity-detail/activity-detail-container.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';

const routes: Routes = [
  { path: 'activity/:id', component: ActivityDetailContainerComponent },
  { path: 'upload', component: UploadFormComponent },
  { path: '**', component: ActivityListComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
