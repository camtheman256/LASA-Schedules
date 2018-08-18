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
  public currentDay: number = (new Date()).getDay();
  public periodEndTime: string;
  public otherSchedule:string;
  public timeRemaining: string;
  public now: Date;
  public lateStartOption: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp) {
    this.now = new Date();
    //TODO: moving current schedule selection to myApp, going to use a separate JSON for schedule control, incl late starts, which means no more late start button
    // May still need a delay button for surprise delays, but implement later plz, move all storage to myApp, I think.
    this.currentDay = (new Date()).getDay();
    if(this.currentDay == 4) this.lateStartOption = true;
    setInterval(() => {
      let out: string;
      this.now = new Date();
      this.currentTime = this.now.toLocaleTimeString([],{hour12: false});
      out = this.periodCheck(this.myApp.currentSchedule);
      this.currentPeriod = out ? out : "After school. " + ((this.now.getDay() === 5) ? "Happy Friday!" : this.timeToNextSchoolDay(this.now.toLocaleTimeString([], {hour12: false}), this.myApp.currentSchedule) + " left before school begins.");
    }, 500);

  }

  periodCheck(schedIndex: number): string {
    let time: string = this.now.toLocaleTimeString([],{hour12: false});
    let itOut: string;
    let timeLeft: string;
    let endOut: string;
    this.staticSchedules[schedIndex]["schedule"].forEach((period, index) => {
      let startTime = (period["startTime"].length === 4 ? "0" : "") + period["startTime"] + ":00";
      let endTime = (period["endTime"].length === 4 ? "0" : "") + period["endTime"] + ":00";
      let next = this.staticSchedules[schedIndex]["schedule"][index + 1] ? this.staticSchedules[schedIndex]["schedule"][index + 1] : null;
      let nextName: string;
      let periodName = period["name"];
      if(periodName.includes("/")) {
        if(this.now.getDay() === 1 || this.now.getDay() === 3) periodName = period["name"].substring(0,1);
        else if(this.now.getDay() === 2 || this.now.getDay() === 4) periodName = period["name"].substring(2);
      }
      if(next != null) {
        nextName = next["name"];
        if(nextName.includes("/")) {
          if(this.now.getDay() === 1 || this.now.getDay() === 3) nextName = next["name"].substring(0,1);
          else if(this.now.getDay() === 2 || this.now.getDay() === 4) nextName = next["name"].substring(2);
        }
      }
      if(time < endTime && time >= startTime){
        itOut = periodName;
        endOut = endTime;
        timeLeft = this.myApp.subtractTime(endTime + ":00", this.now.toLocaleTimeString([],{hour12: false}));
      }
      else if(next != null && time >= endTime && time < next["startTime"]) {
        itOut = "Between " + periodName + " and " + nextName;
        timeLeft = this.myApp.subtractTime(next["startTime"] + ":00",this.now.toLocaleTimeString([],{hour12: false}));
      }
      else {
        this.timeRemaining = null;
      }
    });
    this.periodEndTime = endOut ? endOut.substr(0,5) : null;
    this.timeRemaining = timeLeft;
    if(this.now.getDay() === 0 || this.now.getDay() === 6) {
      itOut = "It's the weekend! Enjoy!";
      this.timeRemaining = null;
    }
    return itOut;
  }
  timeToNextSchoolDay(now:string, schedIndex:number):string {
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
    this.otherSchedule = this.myApp.currentSchedule == 0 ? "Standard Schedule" : "Late Start";
    this.myApp.currentSchedule = this.myApp.currentSchedule ? 0 : 1;
    this.storage.set('currentSchedule', this.myApp.currentSchedule);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentSchedulePage');
  }

}
