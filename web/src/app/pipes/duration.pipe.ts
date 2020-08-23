import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const totalMinutes = Math.floor(value / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const seconds = value - totalMinutes * 60;

    if (totalHours >= 1) {
      return `${totalHours}h ${totalMinutes % 60}m`;
    }

    return `${totalMinutes}m ${seconds}s`;
  }
}
