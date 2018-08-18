import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentSchedulePage } from './current-schedule';
import { CustomPipes } from "../../app/custompipes.module";

@NgModule({
  declarations: [
    CurrentSchedulePage
  ],
  imports: [
    IonicPageModule.forChild(CurrentSchedulePage),
    CustomPipes
  ],
})
export class CurrentSchedulePageModule {}
