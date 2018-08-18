import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  private readonly schedulesObj: Object[] = this.myApp.schedules;
  schedPicker: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public myApp: MyApp) {
      this.schedPicker = this.myApp.currentSchedule ? this.schedulesObj[this.myApp.currentSchedule]["name"] : "Standard";
    }


    ionViewDidLoad() {
      console.log('ionViewDidLoad AllSchedulesPage');
    }

  }
