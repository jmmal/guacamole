import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const totalMinutes = Math.floor(value / 60);
    const seconds = value - totalMinutes * 60;
    return `${totalMinutes}m ${seconds}s`;
  }
}
