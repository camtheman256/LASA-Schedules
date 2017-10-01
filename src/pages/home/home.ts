import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentTime: string;
  constructor(public navCtrl: NavController) {
    this.currentTime = this.calculateTime('-6');


    // If it is Daylight Savings Time
    if (this.dst(new Date())) {
      this.currentTime = this.calculateTime('-5');
    }
  }
  calculateTime(offset: any) {
    // create Date object for current location
    let d = new Date();

    // create new Date object for different city
    // using supplied offset
    let nd = new Date(d.getTime() + (3600000 * offset));

    return nd.toISOString();
  }

  stdTimezoneOffset(today: any) {
    let jan = new Date(today.getFullYear(), 0, 1);
    let jul = new Date(today.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  dst(today: any) {
    return today.getTimezoneOffset() < this.stdTimezoneOffset(today);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.currentTime = this.calculateTime('-6');


    // If it is Daylight Savings Time
    if (this.dst(new Date())) {
      this.currentTime = this.calculateTime('-5');
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  }



