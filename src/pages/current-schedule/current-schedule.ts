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
  public staticSchedules: Object[] = this.myApp.schedules;
  public currentTime: string;
  public currentPeriod: string;
  public currentSchedule: number;
  public currentDay: number = (new Date()).getDay();
  public otherSchedule:string = "Late Start";
  public timeRemaining: string;
  public now: Date;
  public twentyfour: boolean;
  public lateStartOption: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public storage: Storage) {
    // this.currentTime = "10:00:30"; // manual currentTime
    this.currentSchedule = 0;
    this.currentDay = (new Date()).getDay();
    if(this.currentDay == 4) this.lateStartOption = true;
    storage.get("twentyfour").then((val) => {
      this.twentyfour = val;
    });
    setInterval(() => {
      let out: string;
      this.now = new Date();
      this.currentTime = this.now.toLocaleTimeString([],{hour12: this.twentyfour != null ? !this.twentyfour : false});
      out = this.periodCheck(this.now.toLocaleTimeString([],{hour12: false}), this.currentSchedule);
      this.currentPeriod = out ? out : "No school. " + this.timeToTomorrow(this.now.toLocaleTimeString([], {hour12: false}), this.currentSchedule) + " left before schools begins.";
    }, 500);

  }

  periodCheck(time: string, schedIndex: number): string {
    let itOut: string;
    this.staticSchedules[schedIndex]["schedule"].forEach((period, index) => {
      let startTime = (period["startTime"].length === 4 ? "0" : "") + period["startTime"] + ":00";
      let endTime = (period["endTime"].length === 4 ? "0" : "") + period["endTime"] + ":00";
      let next = this.staticSchedules[schedIndex]["schedule"][index + 1] ? this.staticSchedules[schedIndex]["schedule"][index + 1] : null;
      if(time <= endTime && time > startTime){
        itOut = period["name"];
        this.timeRemaining = null;
      }
      else if(next != null && time >= endTime && time < next["startTime"]) {
        itOut = "Between " + period["name"] + " and " + next["name"];
        this.timeRemaining = this.myApp.subtractTime(next["startTime"] + ":00",this.currentTime);
      }
      else {
        this.timeRemaining = null;
      }
    });
    return itOut;
  }
  timeToTomorrow(now:string, schedIndex:number):string {
    let startTime = this.staticSchedules[schedIndex]["schedule"][0]["startTime"] + ":00";
    if(now > startTime) {
      if(this.currentDay == 3) this.lateStartOption = true;
      // prevents after school Thursday from changing schedule for Friday's countdown
      else if(this.currentDay == 4) this.lateStartOption = false;
      return this.myApp.addTime(this.myApp.subtractTime("23:59:59",now),this.myApp.subtractTime(startTime,"00:00:00"));
    }
    else if(startTime > now) {
      return this.myApp.subtractTime(startTime, now);
    }
  }
  updateButton() {
    this.otherSchedule = this.otherSchedule == "Late Start" ? "Normal Schedule" : "Late Start";
    this.currentSchedule = this.currentSchedule ? 0 : 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentSchedulePage');
  }

}
