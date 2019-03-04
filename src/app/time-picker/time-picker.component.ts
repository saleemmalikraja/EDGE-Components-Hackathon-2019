import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input, OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Config, Time } from './models/app-time-picker.model';
import * as moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimePickerComponent implements OnInit, OnChanges {
  @Output() timeChanged: EventEmitter<Time> = new EventEmitter<Time>();
  @Input() config: Config;
  @Input() value: Time;
  @Input() disableTogglebBtn?: boolean;
  @Input() isMeridiemEqual?: boolean;
  @Input() controlMeridiem?: boolean;

  @Input() isLTMinMinute?: boolean;
  timeConfig: any;
  setTime: Time;
  time: Time;
  lableOne = 'AM';
  lableTwo = 'PM';
  btnStyle = {
    padding: '0.55em',
    'font-size': '13px',
    cursor: 'pointer'
  };

  constructor() { }

  ngOnChanges() {
    if (this.controlMeridiem) {
      this.setDefaultTime();
      if (this.config.format === '12') {
        this.timeConfig = {
          minHour: typeof this.config.minHour !== 'undefined' ? this.config.minHour : 1,
          maxHour: typeof this.config.maxHour !== 'undefined' ? this.config.maxHour : 12,
          minMinute: typeof this.config.minMinute !== 'undefined' ? this.config.minMinute : 0,
          maxMinute: typeof this.config.maxMinute !== 'undefined' ? this.config.maxMinute : 59
        };
      } else {
        this.timeConfig = {
          minHour: typeof this.config.minHour !== 'undefined' ? this.config.minHour : 0,
          maxHour: typeof this.config.maxHour !== 'undefined' ? this.config.maxHour : 23,
          minMinute: typeof this.config.minMinute !== 'undefined' ? this.config.minMinute : 0,
          maxMinute: typeof this.config.maxMinute !== 'undefined' ? this.config.maxMinute : 59
        };
      }
    }
  }

  ngOnInit() {
    this.setDefaultTime();
    if (this.config.format === '12') {
      this.timeConfig = {
        minHour: typeof this.config.minHour !== 'undefined' ? this.config.minHour : 1,
        maxHour: typeof this.config.maxHour !== 'undefined' ? this.config.maxHour : 12,
        minMinute: typeof this.config.minMinute !== 'undefined' ? this.config.minMinute : 0,
        maxMinute: typeof this.config.maxMinute !== 'undefined' ? this.config.maxMinute : 59
      };
    } else {
      this.timeConfig = {
        minHour: typeof this.config.minHour !== 'undefined' ? this.config.minHour : 0,
        maxHour: typeof this.config.maxHour !== 'undefined' ? this.config.maxHour : 23,
        minMinute: typeof this.config.minMinute !== 'undefined' ? this.config.minMinute : 0,
        maxMinute: typeof this.config.maxMinute !== 'undefined' ? this.config.maxMinute : 59
      };
    }
  }


  setDefaultTime() {
    const time = moment().format(this.config.format === '12' ? 'hh:mm:a' : 'HH:mm');
    const timeSplit = time.split(':');
    this.time = {
      hour: (this.value.hour == null) ? Number(timeSplit[0]) : this.value.hour,
      minute: (this.value.minute == null) ? Number(timeSplit[1]) : this.value.minute,
      meridiem: this.config.format === '12' ?
       ((this.value.meridiem === '') ? timeSplit[timeSplit.length - 1].toUpperCase() : this.value.meridiem.toUpperCase()) : ''
    };
    this.timeChanged.emit(this.time);
  }

  setHours(hrs: number): void {
    this.time.hour = hrs;
    this.timeChanged.emit(this.time);
  }

  setMinutes(min: number): void {
    this.time.minute = min;
    this.timeChanged.emit(this.time);
  }

  onBtnToggle(value: string): void {
    this.time.meridiem = value;
    this.timeChanged.emit(this.time);
  }

}
