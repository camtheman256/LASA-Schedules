import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SettingsPopover } from './popover';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';


/**
 * Generated class for the AllSchedulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-schedules',
  templateUrl: 'all-schedules.html',
})
export class AllSchedulesPage {
  // collapse these in your editor if they get obnoxious
  public dynamicSchedules: Array<Object> = [
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
  schedPicker: string = this.dynamicSchedules[0]["name"];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController, public storage: Storage, public myApp: MyApp) {
    storage.get('twentyfour').then((val) => {
      if(!val) {
        this.dynamicSchedules.forEach(schedule => {
            schedule["schedule"].forEach(period => {
                if(Number(period["startTime"].substr(0,2)) > 12) {
                  let newHour: string = String(Number(period["startTime"].substr(0,2)) - 12);
                  period["startTime"] = newHour + period["startTime"].substr(2);
                }
                if(Number(period["endTime"].substr(0,2)) > 12) {
                  let newHour2: string = String(Number(period["endTime"].substr(0,2)) - 12);
                  period["endTime"] = newHour2 + period["endTime"].substr(2);
                }
            });
        });
      }
    });
  }

  popoverUp(myEvent) {
    let popover = this.popoverCtrl.create(SettingsPopover);
    popover.present({ ev: myEvent });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllSchedulesPage');
  }

}
