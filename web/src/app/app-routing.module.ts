import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { ActivityPreviewComponent } from './components/activity-preview/activity-preview.component';

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
