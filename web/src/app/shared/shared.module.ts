import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LoadingComponent } from './loading/loading.component';
import { MapboxMapComponent } from './mapbox-map/mapbox-map.component';

// Pipes
import { PacePipe } from './pace.pipe';
import { DurationPipe } from './duration.pipe';

@NgModule({
  declarations: [
    LoadingComponent,
    PacePipe,
    DurationPipe,
    MapboxMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    MapboxMapComponent,
    PacePipe,
    DurationPipe
  ]
})
export class SharedModule { }
