// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { MapboxMapComponent } from './components/mapbox-map/mapbox-map.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';

// Services
import { ActivityService } from './core/activity.service';

// Pipes
import { PacePipe } from './pipes/pace.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { ActivityPreviewComponent } from './components/activity-preview/activity-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    PacePipe,
    DurationPipe,
    MapboxMapComponent,
    UploadFormComponent,
    ActivityPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [
    ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
