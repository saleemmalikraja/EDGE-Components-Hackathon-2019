import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickDatePickerComponent } from './quick-date-picker/quick-date-picker.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { DialogComponentModule } from '../dialog-component/dialog-component.module';
import { DatePickerModule } from '../date-picker/date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    DatePickerModule,
    DialogComponentModule
  ],
  declarations: [QuickDatePickerComponent],
  exports: [QuickDatePickerComponent]
})
export class QuickDatePickerModule { }
