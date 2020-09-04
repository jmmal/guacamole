import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { Activity } from '../activity';

@Component({
  selector: 'app-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPreviewComponent {
  @Input() run: Activity;

  @Output() activityClick = new EventEmitter<any>();

  onClick(): void {
    this.activityClick.emit();
  }
}
