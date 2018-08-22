import { Pipe, PipeTransform } from '@angular/core';
import { MyApp } from './app.component'

@Pipe({name: 'time_format'})
export class TimeFormatPipe implements PipeTransform {
  constructor(private myApp: MyApp) { }
  
  transform(value: string): string {
    let twentyfour: boolean = this.myApp.twentyfour;
    let out: string = ""
    if (!twentyfour && value) {
      let colon: number = value.indexOf(":");
      let hour: number = Number(value.substring(0, colon));
      out += String(hour > 12 ? (hour - 12) : hour);
      out += value.substring(colon);
      out += hour >= 12 ? "p" : "a";
      return out;
    }
    return value;
  }
}
