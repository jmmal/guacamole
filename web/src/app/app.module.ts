// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Third Party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { MapboxMapComponent } from './components/mapbox-map/mapbox-map.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';

// Services
import { ActivityService } from './core/activity.service';

// Pipes
import { PacePipe } from './pipes/pace.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { ActivityDetailContainerComponent } from './components/activity-detail/activity-detail-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    ActivityListComponent,
    ActivityDetailComponent,
    ActivityDetailContainerComponent,
    PacePipe,
    DurationPipe,
    MapboxMapComponent,
    NavBarComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }