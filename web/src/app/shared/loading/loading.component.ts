import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
  <div class="container">
    <div class="spinner-grow text-warning" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-info" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {}
