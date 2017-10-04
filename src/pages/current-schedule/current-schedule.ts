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
  public schedules: Array<Object> = [
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
  public currentTime: string;
  public currentPeriod: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp) {
    this.currentTime = (new Date()).toLocaleTimeString();
    setInterval(() => {
      let dateObj = new Date();
      this.currentTime = dateObj.toLocaleTimeString([],{hour12: false});
      this.currentPeriod = this.periodCheck(this.currentTime, "Standard");
    }, 1000);

  }

  public periodCheck(time: string, dayType: string): string {
    var startTime;
    var endTime;
    if (dayType === "Standard") {
      for(let i = 0; i < this.schedules[0]["schedule"].length; i++){
        let period = this.schedules[0]["schedule"][i];
        startTime = (period["startTime"].length === 4 ? "0" : "") + period["startTime"] + ":00";
        endTime = (period["endTime"].length === 4 ? "0" : "") + period["endTime"] + ":00";
        if(time < endTime && time > startTime){
          console.log(period["name"]);
          return period["name"];
        }
      }
    }
    if(time > "15:45:00"){
      let hours = parseInt(time.substring(0,2));
      let mins = parseInt(time.substring(3,5));
      let secs = parseInt(time.substring(6,8));
      return "After school. " + (24 - hours + 8) + ":" + (60 - mins + 30) + ":" + (60 - secs) + " left before schools begins.";
    }
    return "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentSchedulePage');
  }

}
