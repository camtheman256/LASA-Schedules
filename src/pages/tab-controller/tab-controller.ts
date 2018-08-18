import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabControllerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-controller',
  templateUrl: 'tab-controller.html'
})
export class TabControllerPage {

  currentScheduleRoot = 'CurrentSchedulePage'
  allSchedulesRoot = 'AllSchedulesPage'


  constructor(public navCtrl: NavController) {}

}
