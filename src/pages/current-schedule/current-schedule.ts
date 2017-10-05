import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';


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
  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp) {
    // this.currentTime = "10:00:30"; // manual currentTime
    this.currentSchedule = 0;
    setInterval(() => {
      let dateObj = new Date();
      let out: string;
      this.currentTime = dateObj.toLocaleTimeString([],{hour12: false});
      out = this.periodCheck(this.currentTime, this.currentSchedule);
      let tomorrow = new Date();
      tomorrow.setDate(dateObj.getDate() + 1);
      tomorrow.setHours(parseInt(this.staticSchedules[this.currentSchedule]["schedule"][0]["startTime"].substring(0,2)),parseInt(this.staticSchedules[this.currentSchedule]["schedule"][0]["startTime"].substring(3,5)));
      let diff = (tomorrow.getTime() - Date.now()) / 1000;
      let hrs = Math.floor(diff / 3600);
      diff %= 3600;
      let mins = Math.floor(diff/60);
      let secs = dateObj.getSeconds() === 0 ? 0 : 60 - dateObj.getSeconds();
      this.currentPeriod = out ? out : "No school. " + (hrs.toString().length === 1 ? "0" : "") + (hrs) + ":" + (mins.toString().length === 1 ? "0" : "") + (mins) + ":" + (secs.toString().length === 1 ? "0" : "") + (secs) + " left before schools begins.";
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
  updateButton() {
    this.otherSchedule = this.otherSchedule == "Late Start" ? "Normal Schedule" : "Late Start";
    this.currentSchedule = this.currentSchedule ? 0 : 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentSchedulePage');
  }

}
