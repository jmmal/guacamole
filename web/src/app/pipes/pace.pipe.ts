import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pace'
})
export class PacePipe implements PipeTransform {
  transform(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = `${Math.floor(value - (minutes * 60))}`;

    return `${minutes}:${seconds.padStart(2, '0')}`;
  }
}
