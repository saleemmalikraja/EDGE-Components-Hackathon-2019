import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input, OnChanges,
  OnInit
} from '@angular/core';
import { Style } from './models/app-toggle-button.model';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonComponent implements OnInit, OnChanges {

  @Input() value: string;
  @Input() lableOne: string;
  @Input() lableTwo: string;
  @Input() btnStyle: Style;
  @Input() disableTogglebBtn?: boolean;
  @Input() controlMeridiem?: boolean;

  @Output() toggled = new EventEmitter<string>();
  buttonTxt: string;

  constructor() { }

  ngOnInit() {
    this.buttonTxt = this.value || this.lableOne;
  }

  ngOnChanges() {
    this.buttonTxt = this.value || this.lableOne;
  }

  toggle() {
    this.buttonTxt = (this.buttonTxt === this.lableOne) ? this.lableTwo : this.lableOne;
    this.toggled.emit(this.buttonTxt);
  }


}
