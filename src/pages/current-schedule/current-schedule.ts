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
  public periodEndTime: string;
  public timeRemaining: string;
  public now: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp, public storage: Storage) {
    // update period every half second
    setInterval(() => {
      this.now = new Date();
      this.currentTime = this.now.toLocaleTimeString([],{hour12: false});
      this.periodCheck();
    }, 500);

  }
  
  // runs every time the time is tapped
  toggleTimeFormat(e) {
    this.myApp.twentyfour = !this.myApp.twentyfour;
    this.storage.set("twentyfour", this.myApp.twentyfour);
  }

  periodCheck() {
    let time: string = this.now.toLocaleTimeString([],{hour12: false});
    let timeLeft: string;
    let endOut: string;
    // run determineSchedule which activates the proper schedule
    this.myApp.determineSchedule(this.now);
    // check if there is no school today
    if(this.myApp.currentSchedule == null) {
      this.currentPeriod = this.myApp.scheduleReason;
      this.periodEndTime = null;
      this.timeRemaining = null;
      return;
    }
    // pull combinedAB key from the schedule object to see if we need to split the string in two
    let combinedAB: boolean = this.staticSchedules[this.myApp.currentSchedule]["combinedAB"] || false;
    // iterate through the periods, using some so we can break it once we find where we are
    this.staticSchedules[this.myApp.currentSchedule]["schedule"].some((period, index) => {
      // padding start time and end time with zeros for second calculations
      let startTime = (period["startTime"].length === 4 ? "0" : "") + period["startTime"] + ":00";
      let endTime = (period["endTime"].length === 4 ? "0" : "") + period["endTime"] + ":00";
      
      // checking whether the first period is next
      if(time < startTime && index == 0) {
        this.currentPeriod = "School not started."
        timeLeft = this.myApp.subtractTime(startTime, time);
        return true;
      }
      
      // grab the next period, and getting the name of the period we're checking 
      let next = this.staticSchedules[this.myApp.currentSchedule]["schedule"][index + 1] ? this.staticSchedules[this.myApp.currentSchedule]["schedule"][index + 1] : null;
      let nextName: string;
      let periodName = period["name"];
      
      // splitting the current period names for A and B schedules
      if(combinedAB && periodName.indexOf("/") != -1) {
        if(this.now.getDay() === 1 || this.now.getDay() === 3) periodName = period["name"].substring(0,1);
        else if(this.now.getDay() === 2 || this.now.getDay() === 4) periodName = period["name"].substring(2);
      }
      
      // check whether we're in the period being tested
      if(time < endTime && time >= startTime){
        this.currentPeriod = periodName;
        endOut = endTime;
        timeLeft = this.myApp.subtractTime(endTime + ":00", time);
        return true;
      }
      
      // split next period name if we need to use it for passing periods
      if(next != null) {
        nextName = next["name"];
        if(combinedAB && nextName.indexOf("/") != -1) {
          if(this.now.getDay() === 1 || this.now.getDay() === 3) nextName = next["name"].substring(0,1);
          else if(this.now.getDay() === 2 || this.now.getDay() === 4) nextName = next["name"].substring(2);
        }
      }
      
      // checking for between periods
      else if(next != null && time >= endTime && time < next["startTime"]) {
        this.currentPeriod = "Between " + periodName + " and " + nextName;
        timeLeft = this.myApp.subtractTime(next["startTime"] + ":00",time);
        return true;
      }
      
      // checking if school is out, after last period
      else if(next == null && time >= endTime) {
        this.currentPeriod = "School is released."
        return true;
      }
      
      // this shouldn't happen
      else {
        this.timeRemaining = null;
      }
    });

    // pulling values from our loop and displaying them
    this.periodEndTime = endOut ? endOut.substr(0,5) : null;
    this.timeRemaining = timeLeft;
    return;
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentSchedulePage');
  }

}
