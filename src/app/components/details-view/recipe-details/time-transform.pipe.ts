import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimeTransformPipe implements PipeTransform {

  transform(minutes: number): string {
    return `${Math.floor(minutes / 60)}H ${minutes % 60}M`;
  }

}
