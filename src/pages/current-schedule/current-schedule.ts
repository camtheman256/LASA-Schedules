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
  public currentTime: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public myApp: MyApp) {
    this.currentTime = "0";
    setInterval(() => {
      let dateObj = new Date();
      this.currentTime = dateObj.toLocaleTimeString();
    }, 1000);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentSchedulePage');
  }

}
