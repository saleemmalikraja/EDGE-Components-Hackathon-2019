import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimePickerComponent } from './time-picker.component';
import { ToggleButtonModule } from '../toggle-button/toggle-button.module';
import { NumberInputModule } from '../number-input/number-input.module';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import { NumberInputComponent } from '../number-input/number-input.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ToggleButtonModule, NumberInputModule],
  declarations: [TimePickerComponent],
  exports: [TimePickerComponent]
})
export class TimePickerModule { }
