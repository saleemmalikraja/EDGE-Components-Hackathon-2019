import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberInputComponent implements OnInit, OnChanges {
  @Input() min: number;
  @Input() max: number;
  @Input() label: string;
  @Input() value: number;
  @Input() isMeridiemEqual?: boolean;
  @Input() isLTMinMinute?: boolean;
  @Input() controlMeridiem?: boolean;

  @Output() valueChanged = new EventEmitter();

  numberForm: FormGroup;
  counterValue: any;
  errorClass = false;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.numberForm = this.formbuilder.group({
      inputValue: [this.value]
    });
    this.counterValue = Number(this.numberForm.get('inputValue').value);
    if (this.counterValue > this.max) {
      this.errorClass = true;
      this.numberForm.get('inputValue').reset();
      return false;
    }
  }

  ngOnChanges() {
    if (typeof this.controlMeridiem !== 'undefined' && this.controlMeridiem) {
      this.counterValue = this.numberForm ? Number(this.numberForm.get('inputValue').value) : null;
      if ((this.max !== 59) && (this.isMeridiemEqual)) {
        this.errorClass = true;
        (typeof this.numberForm !== 'undefined') ? this.numberForm.get('inputValue').reset() : null;
        return false;
      } else if (this.max === 59 && this.isLTMinMinute) {
        this.errorClass = true;
        (typeof this.numberForm !== 'undefined') ? this.numberForm.get('inputValue').reset() : null;
        return false;
      }
      return false;
    }
  }

  allowOnlyNumber(event: any): boolean {
    if ((event.which !== 8 && event.which !== 0 && event.which < 48) || event.which > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  onNumberChanged(inputVal: any) {
    this.counterValue = Number(this.numberForm.get('inputValue').value);
    if (this.counterValue < this.min || this.counterValue > this.max) {
      this.errorClass = true;
      this.numberForm.get('inputValue').reset();
      return false;
    }
    this.errorClass = inputVal === null;
    this.valueChanged.emit(this.counterValue);
  }

  decrementNumber() {
    if (this.counterValue > this.min && this.counterValue <= this.max) {
      this.counterValue = this.counterValue - 1;
      this.numberForm.get('inputValue').setValue(this.counterValue);
      this.valueChanged.emit(this.counterValue);
    }
  }

  incrementNumber() {
    if (this.counterValue < this.max) {
      this.counterValue = this.counterValue + 1;
      this.numberForm.get('inputValue').setValue(this.counterValue);
      this.valueChanged.emit(this.counterValue);
    }
  }
}
