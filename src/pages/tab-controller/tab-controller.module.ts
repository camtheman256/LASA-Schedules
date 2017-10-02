import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabControllerPage } from './tab-controller';

@NgModule({
  declarations: [
    TabControllerPage,
  ],
  imports: [
    IonicPageModule.forChild(TabControllerPage),
  ]
})
export class TabControllerPageModule {}
