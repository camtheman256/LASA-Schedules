import { Pipe, PipeTransform } from '@angular/core';
import { MyApp } from './app.component'

@Pipe({name: 'time_format'})
export class TimeFormatPipe implements PipeTransform {
  constructor(private myApp: MyApp) { }
  
  transform(value: string): string {
    let twentyfour = this.myApp.twentyfour;
    if (!twentyfour && value) {
      let colon: number = value.indexOf(":");
      let hour: number = Number(value.substring(0, colon));
      hour = hour > 12 ? hour - 12 : hour;
      return hour + value.substring(colon);
    }
    return value;
  }
}
