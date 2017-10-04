import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  template: `
    <ion-item>
      <ion-label>24-Hour Time</ion-label>
      <ion-checkbox color="primary" checked="{{ checked }}" (click)="swap24()"></ion-checkbox>
    </ion-item>
  `
})
export class SettingsPopover {
  checked: boolean;
  constructor(public viewCtrl: ViewController, public settings: Storage, public toastYum: ToastController) {
    this.settings.get('twentyfour').then((val) => {
      this.checked = val != null ? val : true;
    });
  }
  swap24() {
    this.settings.set('twentyfour', !this.checked);
    let yummyToast = this.toastYum.create({
      message: "Settings saved! Restart app to refresh.",
      duration: 3000
    });
    yummyToast.present();
    this.viewCtrl.dismiss();
  }

}
