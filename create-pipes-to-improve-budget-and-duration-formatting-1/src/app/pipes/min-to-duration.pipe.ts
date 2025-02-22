import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minToDuration',
  standalone: true,
})
export class MinToDurationPipe implements PipeTransform {
  transform(timer: string): string {
    if (!timer) return '';
    const hours = Math.floor(Number(timer) / 60);
    const minutes = Math.floor(Number(timer) % 60);
    return `${hours}h ${minutes}min`;
  }
}
