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
  public schedules = this.myApp.schedules; // need to clone this shit
  schedPicker: string = this.schedules[0]["name"];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController, public storage: Storage, public myApp: MyApp) {
    storage.get('twentyfour').then((val) => {
      if(!val) {
        this.schedules.forEach(schedule => {
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
