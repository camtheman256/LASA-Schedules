import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the CurrentSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-current-schedule',
  templateUrl: 'current-schedule.html',
})

export class CurrentSchedulePage {
  public readonly staticSchedules: Object[] = this.myApp.schedules;
  public currentTime: string;
  public currentPeriod: string;
  public currentDay: number = (new Date()).getDay();
  public periodEndTime: string;
  public timeRemaining: string;
  public now: Date;
  public lateStartOption: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public storage: Storage) {
    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
      this.currentTime = this.now.toLocaleTimeString([],{hour12: false});
      this.periodCheck();
    }, 500);

  }
  
  toggleTimeFormat(e) {
    this.myApp.twentyfour = !this.myApp.twentyfour;
    this.storage.set("twentyfour", this.myApp.twentyfour);
  }

  periodCheck() {
    let time: string = this.now.toLocaleTimeString([],{hour12: false});
    let timeLeft: string;
    let endOut: string;
    this.myApp.determineSchedule(this.now);
    // check if there is no school today
    if(this.myApp.currentSchedule == null) {
      this.currentPeriod = this.myApp.scheduleReason;
      this.periodEndTime = null;
      this.timeRemaining = null;
      return;
    }
    let combinedAB: boolean = this.staticSchedules[this.myApp.currentSchedule]["combinedAB"] || false;
    this.staticSchedules[this.myApp.currentSchedule]["schedule"].some((period, index) => {
      let startTime = (period["startTime"].length === 4 ? "0" : "") + period["startTime"] + ":00";
      let endTime = (period["endTime"].length === 4 ? "0" : "") + period["endTime"] + ":00";
      if(time < startTime && index == 0) {
        this.currentPeriod = "School not started."
        timeLeft = this.myApp.subtractTime(startTime, time);
        return true;
      }
      let next = this.staticSchedules[this.myApp.currentSchedule]["schedule"][index + 1] ? this.staticSchedules[this.myApp.currentSchedule]["schedule"][index + 1] : null;
      let nextName: string;
      let periodName = period["name"];
      if(combinedAB && periodName.indexOf("/") != -1) {
        if(this.now.getDay() === 1 || this.now.getDay() === 3) periodName = period["name"].substring(0,1);
        else if(this.now.getDay() === 2 || this.now.getDay() === 4) periodName = period["name"].substring(2);
      }
      if(time < endTime && time >= startTime){
        this.currentPeriod = periodName;
        endOut = endTime;
        timeLeft = this.myApp.subtractTime(endTime + ":00", time);
        return true;
      }
      if(next != null) {
        nextName = next["name"];
        if(combinedAB && nextName.indexOf("/") != -1) {
          if(this.now.getDay() === 1 || this.now.getDay() === 3) nextName = next["name"].substring(0,1);
          else if(this.now.getDay() === 2 || this.now.getDay() === 4) nextName = next["name"].substring(2);
        }
      }
      else if(next != null && time >= endTime && time < next["startTime"]) {
        this.currentPeriod = "Between " + periodName + " and " + nextName;
        timeLeft = this.myApp.subtractTime(next["startTime"] + ":00",time);
        return true;
      }
      else if(next == null && time >= endTime) {
        this.currentPeriod = "School is released."
        return true;
      }
      else {
        this.timeRemaining = null;
      }
    });
    this.periodEndTime = endOut ? endOut.substr(0,5) : null;
    this.timeRemaining = timeLeft;
    return;
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentSchedulePage');
  }

}
