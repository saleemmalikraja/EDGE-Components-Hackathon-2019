import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as moment from 'moment-timezone';
import { types } from '../date-picker.config';
import { Style } from '../models/date-picker.model';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit {

  @Input() type: string;
  @Input() dateFormat: string;
  @Input() timeFormat?= '24';
  @Input() maxDate: any;
  @Input() minDate: any;
  @Input() fromDateTime: string;
  @Input() toDateTime: string;
  @Input() datePickerStyle: Style;
  @Input() duration: number;
  @Input() controlMeridiem?= false;
  @Output() cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() applySelectedDate: EventEmitter<string> = new EventEmitter<string>();
  selectedDate: Date;
  dateLables = {
    0: '',
    1: ''
  }
  timeLables = {
    0: '',
    1: ''
  }
  tabIndex = 0;
  showToDateContent = false;
  showFromDateContent = true;
  isApplyDisabled = false;
  max: any;
  min: any;
  fromTime = [];
  toTime = [];
  timeValue = {};
  timeConfig: {};
  disableTogglebBtn = false;
  isMeridiemEqual = false;
  isLTMinMinute = false;
  constructor() { }



  ngOnInit() {
    // const minTime = this.minTime ? moment(this.minTime, ["hh:mm A"]).format("hh:mm:a").split(":") : '';
    // const maxTime = this.maxTime ? moment(this.maxTime, ["hh:mm A"]).format("hh:mm:a").split(":") : '';

    const dateFormat = typeof this.dateFormat !== 'undefined' ? this.dateFormat.split(' ') : '';
    this.dateFormat = dateFormat[0];

    const dateTime = typeof this.fromDateTime !== 'undefined' ? this.fromDateTime.split(' ') : '';
    this.fromTime = (dateTime.length <= 1) ? null : moment(this.fromDateTime).format(this.timeFormat === '12' ? 'hh:mm:a' : 'HH:mm').split(":");
    this.timeValue = {
      hour: this.fromTime !== null ? Number(this.fromTime[0]) : null,
      minute: this.fromTime !== null ? Number(this.fromTime[1]) : null,
      meridiem: this.fromTime !== null && typeof this.fromTime[2] !== 'undefined' ? this.fromTime[2].toUpperCase() : ''
    }

    this.max = (typeof this.maxDate !== 'undefined') ? this.maxDate : '';
    this.min = (typeof this.minDate !== 'undefined') ? this.minDate : '';

    // this.maxDate = new Date(moment(this.maxDate, this.dateFormat));
    // this.minDate = new Date(moment(this.minDate, this.dateFormat));

    this.maxDate = (typeof this.maxDate !== 'undefined') ? new Date(this.maxDate) : null;
    this.minDate = (typeof this.minDate !== 'undefined') ? new Date(this.minDate) : null;

    this.selectedDate = (this.fromDateTime === '' || typeof this.fromDateTime === 'undefined') ? null : moment(this.fromDateTime, this.dateFormat)._d;

    this.dateLables['0'] = this.selectedDate !== null ? moment(this.selectedDate, this.dateFormat).format(this.dateFormat) : '';
    this.dateLables['1'] = (this.toDateTime === '' || typeof this.toDateTime === 'undefined') ? null : moment(this.toDateTime, this.dateFormat).format(this.dateFormat);

    const splitTime = typeof this.toDateTime !== 'undefined' ? this.toDateTime.split(' ') : '';
    const toTime = (splitTime.length <= 1) ? null : moment(this.toDateTime).format(this.timeFormat === '12' ? 'hh:mm:a' : 'HH:mm').split(":");

    this.timeLables['0'] = (this.fromTime !== null) && (types[this.type] === 'dateTimeRange' || types[this.type] === 'dateTime' || types[this.type] === 'time') ? ((this.timeFormat === '12') ? `${` ${Number(this.fromTime[0])}:${Number(this.fromTime[1])} ${this.fromTime[2].toUpperCase()}`}` : `${` ${Number(this.fromTime[0])}:${Number(this.fromTime[1])}`}`) : '';
    this.timeLables['1'] = (toTime !== null) && (types[this.type] === 'dateTimeRange') ? ((this.timeFormat === '12') ? `${` ${Number(toTime[0])}:${Number(toTime[1])} ${toTime[2].toUpperCase()}`}` : `${` ${Number(toTime[0])}:${Number(toTime[1])}`}`) : '';

    const isType = (types[this.type] === 'dateTimeRange' || types[this.type] === 'dateRange');
    const isValidDateTimeRange = (this.dateLables['0'] === '' || this.timeLables['0'] === '' || this.dateLables['1'] === '' || this.timeLables['1'] === '');
    this.isApplyDisabled = isType ? (new Date(this.dateLables['1']) < new Date(this.dateLables['0'])) : false;

    this.isApplyDisabled = (types[this.type] === 'date' ? (this.dateLables['0'] === '') :
      (types[this.type] === 'dateTime' ? (this.dateLables['0'] === '' || this.timeLables['0'] === '') :
        (types[this.type] === 'time' ? (this.timeLables['0'] === '') :
          (types[this.type] === 'dateRange' ? (this.dateLables['0'] === '' || this.dateLables['1'] === '') :
            (types[this.type] === 'dateTimeRange' ? isValidDateTimeRange : false)))));
    if (this.duration) {
      this.isApplyDisabled = true;
    }

    if (this.controlMeridiem) {
      this.controlmeridiem();
    }

    else {


      const maxTimeDuration = (typeof this.maxDate !== 'undefined') ? moment(this.maxDate).format(this.timeFormat === '12' ? "hh:mm:a" : "HH:mm").split(":") : '';
      const minTimeDuration = (typeof this.minDate !== 'undefined') ? moment(this.minDate).format(this.timeFormat === '12' ? "hh:mm:a" : "HH:mm").split(":") : '';

      //const isMaxTimeAvail = (maxTimeDuration !== '') ? maxTimeDuration.split(' ') : '';
      // this.fromTime = (dateTime.length <= 1) ? null : moment(this.fromDateTime).format(this.timeFormat === '12' ? 'hh:mm:a' : 'HH:mm').split(":");
      //const isMinTimeAvail = (minTimeDuration !== '') ? maxTimeDuration.split(' ') : '';
      //   this.fromTime = (dateTime.length <= 1) ? null : moment(this.fromDateTime).format(this.timeFormat === '12' ? 'hh:mm:a' : 'HH:mm').split(":");


      this.timeConfig = {
        hourLable: 'Hours',
        minuteLable: 'Minutes',
        format: this.timeFormat
        // maxHour: (isMaxTimeAvail.length <= 1) ? undefined : maxTimeDuration[0],
        // maxMinute: (isMaxTimeAvail.length <= 1) ? undefined : maxTimeDuration[1],
        // minHour: (isMinTimeAvail.length <= 1) ? undefined : minTimeDuration[0],
        // minMinute: (isMinTimeAvail.length <= 1) ? undefined : minTimeDuration[1]
      }

    }
  }

  controlmeridiem() {
    this.isMeridiemEqual = false;
    this.isLTMinMinute = false;
    const maxTimeDuration = (typeof this.maxDate !== 'undefined') ? moment(this.maxDate).format(this.timeFormat === '12' ? "hh:mm:a" : "HH:mm").split(":") : '';
    const minTimeDuration = (typeof this.minDate !== 'undefined') ? moment(this.minDate).format(this.timeFormat === '12' ? "hh:mm:a" : "HH:mm").split(":") : '';
    const maxTimeDiffFormat = moment(this.timeLables[this.tabIndex], ["hh:mm A"]).format("HH:mm").split(":");
    const isMinDateEqual = (moment(this.minDate).format(this.dateFormat) === moment(this.dateLables[0]).format(this.dateFormat));
    const isMaxDateEqual = (moment(this.maxDate).format(this.dateFormat) === moment(this.dateLables[0]).format(this.dateFormat));
    const isMinAndMaxDateEqual = (moment(this.minDate).format(this.dateFormat) === moment(this.dateLables[0]).format(this.dateFormat) && moment(this.maxDate).format(this.dateFormat) === moment(this.dateLables[0]).format(this.dateFormat));
    const selectedMeridiem = moment(this.timeLables[0], ["hh:mm A"]).format('hh:mm:a').split(':');
    const isMeridiemEqual = (selectedMeridiem[2] === 'am' && minTimeDuration[2] === 'am');
    if (isMinDateEqual) {
      if (minTimeDuration[2] === 'am') {
        if (selectedMeridiem[2] !== 'pm') {
          this.timeConfig = {
            hourLable: 'Hours',
            minuteLable: 'Minutes',
            format: this.timeFormat,
            minMinute: minTimeDuration[1]
          }
        }
        else {
          this.timeConfig = {
            hourLable: 'Hours',
            minuteLable: 'Minutes',
            format: this.timeFormat
          }
        }

        if (isMeridiemEqual && minTimeDuration[2] === 'am' && minTimeDuration[0] > selectedMeridiem[0]) {
          this.isMeridiemEqual = true;
        }
        if (isMeridiemEqual && minTimeDuration[2] === 'am' && selectedMeridiem[1] < minTimeDuration[1]) {
          this.isLTMinMinute = true;
        }
      } else {
        this.timeConfig = {
          hourLable: 'Hours',
          minuteLable: 'Minutes',
          format: this.timeFormat,
          minHour: minTimeDuration[0],
          minMinute: minTimeDuration[1]
        }
      }

      this.disableTogglebBtn = minTimeDuration[2] === 'am' ? false : true;
    }
    else if (isMaxDateEqual) {
      if (selectedMeridiem[2] === 'am' && maxTimeDuration[2] === 'pm') {
        this.timeConfig = {
          hourLable: 'Hours',
          minuteLable: 'Minutes',
          format: this.timeFormat
        }
      }
      else if (selectedMeridiem[2] === 'pm' && maxTimeDuration[2] === 'pm') {
        this.timeConfig = {
          hourLable: 'Hours',
          minuteLable: 'Minutes',
          format: this.timeFormat,
          maxHour: maxTimeDuration[0],
          maxMinute: maxTimeDuration[1]
        }
      }

      this.timeValue = {
        hour: selectedMeridiem ? selectedMeridiem[0] : this.fromTime !== null ? Number(this.fromTime[0]) : null,
        minute: selectedMeridiem ? selectedMeridiem[1] : this.fromTime !== null ? Number(this.fromTime[1]) : null,
        meridiem: maxTimeDuration[2] === 'am' ? maxTimeDuration[2].toUpperCase() : ''
      }
      this.disableTogglebBtn = maxTimeDuration[2] === 'am' ? true : false;


      const maxTime = moment(this.timeLables[this.tabIndex], ["hh:mm A"]).format("hh:mm:a").split(":");

      if (maxTimeDuration[2] === 'am' && maxTimeDuration[0] < maxTimeDiffFormat[0]) {
        this.isMeridiemEqual = true;
      }
      if (maxTimeDuration[2] === 'am' && maxTimeDuration[1] < maxTime[1]) {

        this.isLTMinMinute = true;
      }
      if (maxTimeDuration[2] === 'pm' && maxTime[2] === 'pm' && maxTimeDuration[0] < maxTime[0]) {
        this.isMeridiemEqual = true;
      }
      if (maxTimeDuration[2] === 'am' && maxTime[2] === 'pm' && maxTimeDuration[1] < maxTime[1]) {

        this.isLTMinMinute = true;
      }
    }
    if (isMinAndMaxDateEqual) {
      this.timeConfig = {
        hourLable: 'Hours',
        minuteLable: 'Minutes',
        format: this.timeFormat,
        maxHour: maxTimeDuration[0],
        maxMinute: maxTimeDuration[1],
        minHour: minTimeDuration[0],
        minMinute: minTimeDuration[1]
      }
      this.disableTogglebBtn = maxTimeDuration[2] === 'am' ? true : false;

      this.timeValue = {
        hour: selectedMeridiem ? selectedMeridiem[0] : this.fromTime !== null ? Number(this.fromTime[0]) : null,
        minute: selectedMeridiem ? selectedMeridiem[1] : this.fromTime !== null ? Number(this.fromTime[1]) : null,
        meridiem: maxTimeDuration[2] === 'am' ? maxTimeDuration[2].toUpperCase() : ''
      }
      if ((maxTimeDuration[2] === 'am') && (maxTimeDiffFormat[0] > maxTimeDuration[0] || minTimeDuration[0] > maxTimeDiffFormat[0])) {
        this.isMeridiemEqual = true;
      }
    }
    else {
      this.timeConfig = {
        hourLable: 'Hours',
        minuteLable: 'Minutes',
        format: this.timeFormat
      }
      this.disableTogglebBtn = false;
    }
    // }
  }

  selectedDateChanged(date: Date) {
    this.selectedDate = date;
    this.dateLables[this.tabIndex] = moment(this.selectedDate, this.dateFormat).format(this.dateFormat);
    const isType = (types[this.type] === 'dateTimeRange' || types[this.type] === 'dateRange');
    if (this.duration) {
      if (this.tabIndex === 0) {
        this.dateLables['1'] = moment(this.getToDate(date)).format(this.dateFormat);
      }
    }
    this.isApplyDisabled = isType ? (new Date(this.dateLables['1']) < new Date(this.dateLables['0'])) : false;

    if (this.controlMeridiem) {
      this.controlmeridiem();
    }
  }

  onTabChanged(tab: { index: number; }) {
    // const hours = (this.timeDuration / 60);
    // const rhours = Math.floor(hours);
    // const minutes = (hours - rhours) * 60;
    // const rminutes = Math.round(minutes);

    // const minTime = this.minTime ? moment(this.minTime, ["hh:mm A"]).format("hh:mm:a").split(":") : '';
    // const maxTime = this.maxTime ? moment(this.maxTime, ["hh:mm A"]).format("hh:mm:a").split(":") : '';
    // const selectedFromTime = this.maxTime ? moment(this.timeLables[0], ["hh:mm A"]).format("hh:mm:a").split(":") : '';
    // const selectedToTime = this.maxTime ? moment(this.timeLables[1], ["hh:mm A"]).format("hh:mm:a").split(":") : '';

    this.tabIndex = tab.index;
    this.selectedDate = moment(this.dateLables[this.tabIndex], this.dateFormat)._d;

    const timeSelected = (this.timeLables[this.tabIndex] !== '') ? ((this.timeFormat === '12') ? moment(this.timeLables[this.tabIndex], ["hh:mm A"]).format("hh:mm:a").split(":") : moment(this.timeLables[this.tabIndex], ["HH:mm"]).format("HH:mm").split(":")) : null;
    this.timeValue = {
      hour: (timeSelected !== null) ? Number(timeSelected[0]) : null,
      minute: (timeSelected !== null) ? Number(timeSelected[1]) : null,
      meridiem: (timeSelected !== null && typeof timeSelected[2] !== 'undefined') ? timeSelected[2].toUpperCase() : ''
    }

    // this.tabIndex === 0 ? this.timeConfig = {
    //   minHour: (Number(selectedToTime[0]) - Number(rhours)).toString(),
    //   maxHour: maxTime[0],
    //   minMinute: minTime[1],
    //   maxMinute: maxTime[1]
    // } : {
    //     minHour: selectedFromTime[0],
    //     maxHour: (Number(selectedFromTime[0]) + Number(rhours)).toString(),
    //     minMinute: selectedFromTime[1],
    //     maxMinute: (Number(selectedFromTime[1]) + Number(rminutes)).toString()
    //   };

    this.showFromDateContent = this.tabIndex === 0;
    this.showToDateContent = this.tabIndex === 1;

    // this.maxDate = this.tabIndex === 0 ? this.maxDate = '' : (this.max === '' ? new Date() : new Date(this.max));
    // this.maxDate = this.tabIndex === 0 ? this.maxDate = '' : (this.max === '' ? '' : new Date(this.max));
    // this.minDate = this.tabIndex === 0 ? new Date(this.min) : new Date(this.dateLables['0']);
    // if (this.duration) {
    //   if (this.showToDateContent) {
    //     this.maxDate = this.dateLables[1] ? new Date(this.dateLables[1]) : new Date();
    //   }
    //   else {
    //     this.maxDate = this.max ? new Date(this.max) : new Date();
    //   }
    // }

    if (this.showFromDateContent) {
      this.minDate = new Date(this.min)
      if (this.duration) {
        this.maxDate = this.max ? new Date(this.max) : new Date();
      } else {
        this.maxDate = this.max === '' ? '' : new Date(this.max);
        this.minDate = this.tabIndex === 0 ? new Date(this.min) : new Date(this.dateLables['0']);
      }
    }

    if (this.showToDateContent) {
      this.minDate = moment(this.dateLables['0'], this.dateFormat)._d;
      if (this.duration) {
        this.maxDate = this.dateLables[1] ? new Date(this.getToDate(this.minDate)) : new Date();
      } else {
        this.maxDate = this.max === '' ? '' : new Date(this.max);
        this.minDate = this.tabIndex === 0 ? new Date(this.min) : new Date(this.dateLables['0']);
      }
    }

    // please add below changes in if conditions
    // this.maxDate = this.max === '' ? '' : new Date(this.max);
    // this.minDate = this.tabIndex === 0 ? new Date(this.min) : new Date(this.dateLables['0']);
  }

  onCancel() {
    this.cancel.emit('Cancel');
  }

  onApply() {
    const fromDateTime = `${moment(this.dateLables['0'], this.dateFormat).format(this.dateFormat)}${this.timeLables['0']}`;
    const toDateTime = `${moment(this.dateLables['1'], this.dateFormat).format(this.dateFormat)}${this.timeLables['1']}`;
    const toDate = `${moment(this.dateLables['1'], this.dateFormat).format(this.dateFormat)}`;
    const fromDate = `${moment(this.dateLables['0'], this.dateFormat).format(this.dateFormat)}`
    const fromTime = `${this.timeLables['0']}`;
    (types[this.type] === 'date' ? this.applySelectedDate.emit(`${fromDate}`) :
      (types[this.type] === 'dateTime' ? this.applySelectedDate.emit(`${fromDateTime}`) :
        (types[this.type] === 'time' ? this.applySelectedDate.emit(`${fromTime}`) :
          (types[this.type] === 'dateRange' ? this.applySelectedDate.emit(`${`${fromDate} - ${toDate}`}`) :
            (types[this.type] === 'dateTimeRange' ? this.applySelectedDate.emit(`${`${fromDateTime} - ${toDateTime}`}`) : '')))));
  }

  timeChanged(val: any) {
    this.isMeridiemEqual = false;
    this.isLTMinMinute = false;
    this.timeLables[this.tabIndex] = `${` ${val.hour}:${val.minute} ${val.meridiem}`}`;
    const isValidDateTimeRange = (this.dateLables['0'] === '' || this.timeLables['0'] === '' || this.dateLables['1'] === '' || this.timeLables['1'] === '');
    const minTimeDuration = (typeof this.minDate !== 'undefined') ? moment(this.minDate).format(this.timeFormat === '12' ? "hh:mm:a" : "HH:mm").split(":") : '';
    this.isApplyDisabled = (types[this.type] === 'dateTime' ? (this.dateLables['0'] === '' || this.timeLables['0'] === '') :
      (types[this.type] === 'time' ? (this.timeLables['0'] === '') :
        (types[this.type] === 'dateTimeRange' ? isValidDateTimeRange : false)));

    if (this.controlMeridiem) {

      const minTime = moment(this.timeLables[this.tabIndex], ["hh:mm A"]).format("HH:mm").split(":");
      const isMaxDateEqual = (moment(this.maxDate).format(this.dateFormat) === moment(this.selectedDate).format(this.dateFormat));
      const minAndSelectedEqual = (moment(this.minDate).format(this.dateFormat) === moment(this.selectedDate).format(this.dateFormat));
      const timeSelected = (minTime[0] >= 12 || minTime[0] === '00' || minTime[0] < minTimeDuration[0]);
      const maxTimeDuration = (typeof this.maxDate !== 'undefined') ? moment(this.maxDate).format(this.timeFormat === '12' ? "hh:mm:a" : "HH:mm").split(":") : '';

      const isMeridiemEqual = (val.meridiem === 'AM' && minTimeDuration[2] === 'am');
      if (minAndSelectedEqual && timeSelected && isMeridiemEqual) {
        this.isMeridiemEqual = isMeridiemEqual;
      }
      if (minAndSelectedEqual && isMeridiemEqual && minTimeDuration[2] === 'am' && val.minute < minTimeDuration[1]) {

        this.isLTMinMinute = true;
      }

      if (minAndSelectedEqual && isMeridiemEqual && minTimeDuration[2] === 'am' && val.hour < minTimeDuration[0]) {

        this.isMeridiemEqual = true;
      }

      if (minAndSelectedEqual && minTimeDuration[2] === 'am' && val.meridiem === 'PM') {
        this.timeConfig = {
          hourLable: 'Hours',
          minuteLable: 'Minutes',
          format: this.timeFormat
        }
      }

      //max

      const maxTime = moment(this.timeLables[this.tabIndex], ["hh:mm A"]).format("hh:mm:a").split(":");

      if (isMaxDateEqual && maxTimeDuration[2] === 'pm' && maxTime[2] === 'pm' && maxTimeDuration[0] < maxTime[0]) {
        this.isMeridiemEqual = true;
      }
      if (isMaxDateEqual && maxTimeDuration[2] === 'am' && val.meridiem === 'pm' && maxTimeDuration[1] < val.minute) {

        this.isLTMinMinute = true;
      }

      if (isMaxDateEqual && maxTimeDuration[2] === 'PM' && val.meridiem === 'AM') {
        this.timeConfig = {
          hourLable: 'Hours',
          minuteLable: 'Minutes',
          format: this.timeFormat
        }
      }
      const isMinAndMaxDateEqual = (moment(this.minDate).format(this.dateFormat) === moment(this.selectedDate).format(this.dateFormat) && moment(this.maxDate).format(this.dateFormat) === moment(this.selectedDate).format(this.dateFormat));
      const maxTimeDiffFormat = moment(this.timeLables[this.tabIndex], ["hh:mm A"]).format("hh:mm:a").split(":");

      if ((isMinAndMaxDateEqual) && (minTimeDuration[2] === 'am' && maxTimeDiffFormat[0] < minTimeDuration[0])) {
        this.isMeridiemEqual = true;
      }
      if ((isMinAndMaxDateEqual) && (maxTimeDuration[2] === 'pm' && maxTimeDiffFormat[0] > maxTimeDuration[0])) {
        this.isMeridiemEqual = true;
      }
    }
  }

  /**
   * Use this function to caluclate the get date from the selected from date 
   *
   * @param {*} date
   * @returns
   * @memberof DatePickerComponent
   */
  getToDate(date: any) {
    let maxDate = (moment(date).add(this.duration, 'minutes'))._d
    if (moment(maxDate).isAfter(new Date())) {
      maxDate = moment(new Date())._d;
    }
    return maxDate;
  }
}
