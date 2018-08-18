import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { TabControllerPage } from '../pages/tab-controller/tab-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabControllerPage;
  public schedules: Object[] = [];
  public currentSchedule: number = 0;
  public scheduleReason: string = "";
  public twentyfour: boolean = false;
  public holidays: Object = {};
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, http: HttpClient, storage: Storage) {
    this.initializeApp();
    http.get('/assets/schedule.json').subscribe((res: Object[]) => this.schedules = res);
    http.get('/assets/school-year.json').subscribe((res: Object) => this.holidays = res);

    // pull 24 hour preference from DB
    storage.get("twentyfour").then((val) => {
      this.twentyfour = val;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#340071");
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  // takes in a Date object, strips it of time data, and determines what schedule should apply
  public determineSchedule(day: Date): number {
    // strip date of time information
    day = this.stripTime(day);
    let return_please: boolean = false;
    
    // check if the date is outside of the school year
    if(day < new Date(this.holidays["not_before"]) || day > new Date(this.holidays["not_after"])) {
      this.currentSchedule = null;
      this.scheduleReason = "School not in session";
      if(day > new Date(this.holidays["not_after"])) {
        return -1;
      }
      return 0;
    }
    // holiday checking
    this.holidays["holidays"].forEach(holiday => {
        if(this.dateApplies(day, holiday)) {
          this.currentSchedule = null;
          this.scheduleReason = "School Holiday";
          return_please = true;
        }
    });
    if(return_please) return 0;

    // special schedule checking
    for (let i = 2; i < this.schedules.length; i++) {
      this.schedules[i]["dates"].forEach(date => {
        if(this.dateApplies(day, date)) {
          this.currentSchedule = i;
          return_please = true;
        }
      });
    }
    if(return_please) return 3;
    // Wednesday checking
    if(day.getDay() == 3) {
      this.currentSchedule = 1;
      return 2;
    }
    // weekend checking
    if(day.getDay() == 6 || day.getDay() == 0) {
      this.currentSchedule = null;
      this.scheduleReason = "Weekend";
      return 0;
    }

    // otherwise, default to standard schedule
    this.currentSchedule = 0;
    return 1;
  }

  dateApplies(test_date: Date, stored_date: string | Array<string>): boolean {
    // check if we have a date range
    if(stored_date instanceof Array) {
      return test_date >= new Date(stored_date[0]) && test_date <= new Date(stored_date[1]);
    }
    // otherwise just check if the dates are equal
    else {
      return test_date.getTime() === new Date(stored_date).getTime();
    }
  }
  
  stripTime(day: Date): Date {
    // strip date of time information, by setting all times to 0
    day = new Date(day.getTime());
    day.setHours(0);
    day.setMinutes(0);
    day.setSeconds(0);
    day.setMilliseconds(0);
    return day;
  }

  subtractTime(timeA: string, timeB: string): string {
    let timeArray: string[] = timeA.split(":");
    let timeBrray: string[] = timeB.split(":");
    let timeAsec: number = Number(timeArray[0])*3600 + Number(timeArray[1])*60 + Number(timeArray[2]);
    let timeBsec: number = Number(timeBrray[0])*3600 + Number(timeBrray[1])*60 + Number(timeBrray[2]);
    let subtracted: number = timeAsec - timeBsec;
    let outA = [Math.floor(subtracted/3600),Math.floor((subtracted % 3600)/60),subtracted % 60];
    let padA:string[] = [];
    outA.forEach((timeElement) => {
      let timeString = timeElement.toString();
      padA.push(timeString.length < 2 ? "0" + timeString : timeString);
    });
    return padA[0] + ":" + padA[1] + ":" + padA[2];
  }
  addTime(timeA: string, timeB: string):string {
    let timeArray: string[] = timeA.split(":");
    let timeBrray: string[] = timeB.split(":");
    let timeAsec: number = Number(timeArray[0])*3600 + Number(timeArray[1])*60 + Number(timeArray[2]);
    let timeBsec: number = Number(timeBrray[0])*3600 + Number(timeBrray[1])*60 + Number(timeBrray[2]);
    let added: number = timeAsec + timeBsec;
    let outA = [Math.floor(added/3600),Math.floor((added % 3600)/60),added % 60];
    let padA:string[] = [];
    outA.forEach((timeElement) => {
      let timeString = timeElement.toString();
      padA.push(timeString.length < 2 ? "0" + timeString : timeString);
    });
    return padA[0] + ":" + padA[1] + ":" + padA[2];
  }
}
