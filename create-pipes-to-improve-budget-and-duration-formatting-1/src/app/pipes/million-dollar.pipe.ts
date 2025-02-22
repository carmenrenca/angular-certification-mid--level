import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millionDollar',
  standalone: true,
})
export class MillionDollarPipe implements PipeTransform {
  transform(value: string): unknown {
    const data = value.includes('-') ? value.split('-') : [value];
    return data.length === 1
      ? ` $${data[0]} million`
      : ` $${data[0]} to $${data[1]} million`;
  }
}
