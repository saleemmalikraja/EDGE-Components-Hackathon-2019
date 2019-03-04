import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberInputComponent } from './number-input.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [NumberInputComponent],
  exports: [NumberInputComponent]
})
export class NumberInputModule {}
