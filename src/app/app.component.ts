import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabControllerPage } from '../pages/tab-controller/tab-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabControllerPage;
  public readonly schedules: Array<Object> = [
    {
      name: "Standard",
      schedule: [{
        name: "1/5",
        startTime: "8:30",
        endTime: "10:00",
        runTime: "90"
      },
      {
        name: "2/6",
        startTime: "10:05",
        endTime: "11:40",
        runTime: "95"
      },
      {
        name: "Lunch",
        startTime: "11:40",
        endTime: "12:35",
        runTime: "55"
      },
      {
        name: "3/7",
        startTime: "12:40",
        endTime: "14:10",
        runTime: "90"
      },
      {
        name: "4/8",
        startTime: "14:15",
        endTime: "15:45",
        runTime: "90"
      }]
    },
    {
      name: "Late Start",
      schedule: [
        {
          name: "5",
          startTime: "10:10",
          endTime: "11:15",
          runTime: "65"
        },
        {
          name: "6",
          startTime: "11:20",
          endTime: "12:30",
          runTime: "70"
        },
        {
          name: "Lunch",
          startTime: "12:30",
          endTime: "13:25",
          runTime: "55"
        },
        {
          name: "7",
          startTime: "13:30",
          endTime: "14:35",
          runTime: "65"
        },
        {
          name: "8",
          startTime: "14:40",
          endTime: "15:45",
          runTime: "65"
        }
      ]
    },
    {
      name: "Pep Rally",
      schedule: [
        {
          name: "1/5",
          startTime: "8:30",
          endTime: "9:50",
          runTime: "80",
        },
        {
          name: "2/6",
          startTime: "9:55",
          endTime: "11:20",
          runTime: "85"
        },
        {
          name: "Lunch",
          startTime: "11:20",
          endTime: "12:15",
          runTime: "55",
        },
        {
          name: "3/7",
          startTime: "12:20",
          endTime: "13:40",
          runTime: "80",
        },
        {
          name: "4/8",
          startTime: "13:45",
          endTime: "15:05",
          runTime: "80"
        },
        {
          name: "Pep Rally",
          startTime: "15:05",
          endTime: "15:45",
          runTime: "40"
        }
      ]
    },
    {
      name: "C Day",
      schedule: [
        {
          name: "1",
          startTime: "8:30",
          endTime: "9:15",
          runTime: "45"
        },
        {
          name: "2",
          startTime: "9:20",
          endTime: "10:10",
          runTime: "50",
        },
        {
          name: "3",
          startTime: "10:15",
          endTime: "11:00",
          runTime: "45"
        },
        {
          name: "4",
          startTime: "11:05",
          endTime: "11:50",
          runTime: "45"
        },
        {
          name: "Lunch",
          startTime: "11:50",
          endTime: "12:25",
          runTime: "35"
        },
        {
          name: "5",
          startTime: "12:30",
          endTime: "13:15",
          runTime: "45"
        },
        {
          name: "6",
          startTime: "13:20",
          endTime: "14:05",
          runTime: "45"
        },
        {
          name: "7",
          startTime: "14:10",
          endTime: "14:55",
          runTime: "45"
        },
        {
          name: "8",
          startTime: "15:00",
          endTime: "15:45",
          runTime: "45"
        },
      ]
    },
    {
      name: "2 Hour Delay",
      schedule: [
        {
          name: "1/5",
          startTime: "10:30",
          endTime: "11:35",
          runTime: "65"
        },
        {
          name: "2/6",
          startTime: "11:40",
          endTime: "12:45",
          runTime: "65"
        },
        {
          name: "Lunch",
          startTime: "12:45",
          endTime: "13:25",
          runTime: "40"
        },
        {
          name: "3/7",
          startTime: "13:30",
          endTime: "14:35",
          runTime: "65"
        },
        {
          name: "4/8",
          startTime: "14:40",
          endTime: "15:45",
          runTime: "65"
        },
      ]
    }
  ];
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
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
}
