import { NgModule } from '@angular/core'
import { TimeFormatPipe } from './time_format.pipe';

@NgModule({
  declarations: [
    TimeFormatPipe
  ],
  exports: [
    TimeFormatPipe
  ]
})

export class CustomPipes{};
