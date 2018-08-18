import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllSchedulesPage } from './all-schedules';
import { CustomPipes } from "../../app/custompipes.module";

@NgModule({
  declarations: [
    AllSchedulesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllSchedulesPage),
    CustomPipes
  ],
})
export class AllSchedulesPageModule {}
