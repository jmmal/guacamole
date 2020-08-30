// Core Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App Imports
import { UploadFormComponent } from './activities/upload-form/upload-form.component';
import { ActivityPreviewComponent } from './activities/activity-preview/activity-preview.component';

const routes: Routes = [
  { path: 'upload', component: UploadFormComponent },
  { path: '**', component: ActivityPreviewComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
