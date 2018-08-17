import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient } from '@angular/common/http';

import { TabControllerPage } from '../pages/tab-controller/tab-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabControllerPage;
  public schedules: Object[] = [];
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, http: HttpClient) {
    this.initializeApp();
    http.get('/assets/schedule.json').subscribe((res: Object[]) => this.schedules = res);
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
