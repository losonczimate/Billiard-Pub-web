import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let part = value.split(" ");
    let another = part[1].split(":");
    
    let addplus1hour = Number(another[0])+1;
    let result = part[0]+ " " + another[0] + "-" + another[1] + " " + addplus1hour + "-" + another[1]; 
    return result;

  }

}
