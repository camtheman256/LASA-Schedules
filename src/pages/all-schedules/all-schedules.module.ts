import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllSchedulesPage } from './all-schedules';

@NgModule({
  declarations: [
    AllSchedulesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllSchedulesPage),
  ],
})
export class AllSchedulesPageModule {}
