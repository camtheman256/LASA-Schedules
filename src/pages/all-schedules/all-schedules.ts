import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public schedules: Array<Object> = [
    {
      name: "Standard",
      schedule: [{
        name: "1/5",
        startTime: "8:30",
        endTime: "10:00"
      },
      {
        name: "2/6",
        startTime: "10:05",
        endTime: "11:40"
      },
      {
        name: "Lunch",
        startTime: "11:40",
        endTime: "12:35"
      },
      {
        name: "3/7",
        startTime: "12:40",
        endTime: "14:10",
      },
      {
        name: "4/8",
        startTime: "14:15",
        endTime: "15:45"
      }]
    }
  ];
  schedPicker: string = this.schedules[0]["name"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllSchedulesPage');
  }

}
