import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
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

  private readonly schedulesObj: Object[] = this.myApp.schedules;
  schedPicker: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController, public storage: Storage, public myApp: MyApp) {
      
    }


    ionViewDidLoad() {
      console.log('ionViewDidLoad AllSchedulesPage');
    }

  }
