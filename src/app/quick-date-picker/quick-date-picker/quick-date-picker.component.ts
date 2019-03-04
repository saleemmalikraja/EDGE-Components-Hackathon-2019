import {
  Component, OnInit, Input, Output, EventEmitter,
  ChangeDetectionStrategy, OnChanges, SimpleChange, SimpleChanges
} from '@angular/core';
import { QuickDatePicker } from './quick-date-picker.config';
import * as moment from 'moment-timezone';
import { DateTimeRange } from '../models/quick-date-picker.model';
import { Style } from '../models/quick-date-picker.model';
@Component({
  selector: 'app-quick-date-picker',
  templateUrl: './quick-date-picker.component.html',
  styleUrls: ['./quick-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuickDatePickerComponent implements OnInit, OnChanges {
  @Input() datePresets = [];
  @Input() dateFormat: string;
  @Input() value: string;
  @Input() fromDateTime: string;
  @Input() toDateTime: string;
  @Input() minDate: string;
  @Input() maxDate: string;
  @Input() localString ?= true;
  @Input() calendarTitle: string;
  @Input() closable: boolean;
  @Input() dismissable: boolean;
  @Input() type: string;
  @Input() duration: number;
  @Input() datePickerStyle: Style;
  @Output() DateChanged = new EventEmitter<DateTimeRange>();
  firstday: any;
  lastday: any;
  VisibleOptions = true;
  ShowDateRange = false;
  showOptions = false;

  displayValue = '';
  cachedValue: string;

  constructor() { }

  ngOnInit() {
    const dateConfig = new QuickDatePicker();
    this.datePresets = dateConfig.presets.filter(preset => this.datePresets.indexOf(preset.lable) !== -1);
    this.showOptions = true;
    this.onChange(this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dateFormat && changes.dateFormat.previousValue) {
      this.updateDateFormat(changes.dateFormat.previousValue, changes.dateFormat.currentValue);
    }
  }

  onChange(selectedPreset: string): void {
    this.displayValue = this.datePresets.find((el) => el.id === selectedPreset).lable;
    this.getDate(selectedPreset).then((dateRange) => {
      this.cachedValue = this.value;
      this.DateChanged.emit(dateRange);
    });
  }

  getDate(dateSelected: string): Promise<DateTimeRange> {
    return new Promise((resolve, reject) => {
      let dateRange: DateTimeRange | PromiseLike<DateTimeRange>;
      switch (dateSelected) {
        case 'today':
          this.firstday = moment().startOf('day');
          this.lastday = moment().endOf('day');
          dateRange = this.getUTCDateString(this.localString, dateSelected);
          resolve(dateRange);
          break;
        case 'yesterday':
          this.firstday = moment().subtract(1, 'days').startOf('day');
          this.lastday = moment().subtract(1, 'days').endOf('day');
          dateRange = this.getUTCDateString(this.localString, dateSelected);
          resolve(dateRange);
          break;
        case 'this_week':
          this.firstday = moment().startOf('week');
          this.lastday = moment().endOf('week');
          if (this.duration) {
            this.lastday = moment();
          }
          dateRange = this.getUTCDateString(this.localString, dateSelected);
          resolve(dateRange);
          break;
        case 'last_week':
          this.firstday = moment().subtract(1, 'weeks').startOf('week');
          this.lastday = moment().subtract(1, 'weeks').endOf('week');
          dateRange = this.getUTCDateString(this.localString, dateSelected);
          resolve(dateRange);
          break;

        case 'last_7days':
          this.lastday = moment().endOf('day');
          this.firstday = moment(this.lastday, this.dateFormat).subtract(6, 'days');
          dateRange = this.getUTCDateString(this.localString, dateSelected);
          resolve(dateRange);
          break;

        case 'this_month':
          this.firstday = moment().startOf('month');
          this.lastday = moment().endOf('month');
          dateRange = this.getUTCDateString(this.localString, dateSelected);
          resolve(dateRange);
          break;
        case 'last_month':
          this.firstday = moment().subtract(1, 'month').startOf('month');
          this.lastday = moment().subtract(1, 'month').endOf('month');
          dateRange = this.getUTCDateString(this.localString, dateSelected);
          resolve(dateRange);
          break;
        case 'this_year':
          this.firstday = moment().startOf('year');
          this.lastday = moment().endOf('year');
          dateRange = this.getUTCDateString(this.localString, dateSelected);
          resolve(dateRange);
          break;
        case 'custom_range':
          this.openDateRange();
          break;
        default:
          break;
      }
    });
  }

  /**
   * when custome field clicked
   */
  openDateRange() {
    this.ShowDateRange = true;
    this.VisibleOptions = true;
  }
  /**
   * when apply btn clicked in the date picker
   */
  onApply(date: string) {
    this.ShowDateRange = false;
    this.VisibleOptions = true;
    this.cachedValue = this.value;
    const dateValue = date.split(' - ');
    const dateRange = {
      fromDateTime: this.localString ?
        moment(dateValue[0], this.dateFormat).format(this.dateFormat) : moment(dateValue[0], this.dateFormat).utc().format(this.dateFormat),
      toDateTime: this.localString ?
        moment(dateValue[1], this.dateFormat).format(this.dateFormat) : moment(dateValue[1], this.dateFormat).utc().format(this.dateFormat),
      id: 'custom_range'
    };
    this.firstday = dateRange.fromDateTime;
    this.lastday = dateRange.toDateTime;
    this.DateChanged.emit(dateRange);
  }
  /**
   * when apply btn clicked in the date picker
   */
  onCancel() {
    if (this.cachedValue !== 'custom_range') {
      this.value = this.cachedValue;
      this.displayValue = this.datePresets.find((el) => el.id === this.cachedValue).lable;
    }
    this.ShowDateRange = false;
    this.VisibleOptions = false;
  }

  /**
   * Use this function to update the date format
   */
  updateDateFormat(oldFormat: string, newFormat: string) {
    this.firstday = moment(this.firstday, oldFormat).format(newFormat);
    this.lastday = moment(this.lastday, oldFormat).format(newFormat);
    this.dateFormat = newFormat;
    this.fromDateTime = moment(this.fromDateTime, oldFormat).format(newFormat);
    this.toDateTime = moment(this.toDateTime, oldFormat).format(newFormat);
  }

  getUTCDateString(localString: boolean, dateSelected: string) {
    this.firstday = localString ? this.firstday.format(this.dateFormat) : this.firstday.utc().format(this.dateFormat)
    this.lastday = localString ? this.lastday.format(this.dateFormat) : this.lastday.utc().format(this.dateFormat)
    return { fromDateTime: this.firstday, toDateTime: this.lastday, id: dateSelected };
  }
}
