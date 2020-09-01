import { Component, Input } from '@angular/core';

import { Activity } from '../activity';

@Component({
  selector: 'app-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.scss']
})
export class ActivityPreviewComponent {
  @Input() run: Activity;
}
