import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatTabsModule } from '@angular/material';

import { DateConfigService } from './date-picker.config';
import { TimePickerModule } from '../time-picker/time-picker.module';

@NgModule({
  imports: [
    CommonModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatTabsModule,
    TimePickerModule],
  declarations: [DatePickerComponent],
  providers: [DateConfigService],
  exports: [DatePickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DatePickerModule { }
