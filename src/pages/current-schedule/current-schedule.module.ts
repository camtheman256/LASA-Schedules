import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentSchedulePage } from './current-schedule';

@NgModule({
  declarations: [
    CurrentSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentSchedulePage),
  ],
})
export class CurrentSchedulePageModule {}
