// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
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
    GoogleMapComponent,
    PacePipe,
    DurationPipe,
    MapboxMapComponent,
    UploadFormComponent,
    ActivityPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
