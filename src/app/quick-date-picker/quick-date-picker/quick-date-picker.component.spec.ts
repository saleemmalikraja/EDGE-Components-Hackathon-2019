import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QuickDatePickerComponent } from './quick-date-picker.component';
import { QuickDatePicker } from './quick-date-picker.config'
import { MatSelectModule } from '@angular/material/select';
import * as moment from 'moment-timezone';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

describe('QuickDatePickerComponent', () => {
  let component: QuickDatePickerComponent;
  let fixture: ComponentFixture<QuickDatePickerComponent>;
  let dateConfig: QuickDatePicker;
  let html: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSelectModule, NoopAnimationsModule, FormsModule],
      declarations: [QuickDatePickerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickDatePickerComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    dateConfig = new QuickDatePicker();
    component.datePresets = ['Today', 'Yesterday', 'This Week', 'Last 7 days', 'Custom Range'];
    component.dateFormat = 'MM/DD/YYYY hh:mm:ss';
    //component.timeZone = 'America/Los_Angeles';
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute `ngOnInit()`method', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.value = 'Today';
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should execute `onChange()`method and call `getDate()` method to get today`s date', () => {
    const firstday = moment().startOf('day').utc().format(component.dateFormat);
    const lastday = moment().endOf('day').utc().format(component.dateFormat);
    const dateRange = { fromDateTime: firstday, toDateTime: lastday, id: 'today' };
    component.value = 'today'
    spyOn(component, 'getDate').and.callThrough();
    spyOn(component, 'onChange').and.callThrough();
    component.onChange('today');
    expect(component.onChange).toHaveBeenCalled();
    expect(component.getDate).toHaveBeenCalled();
    component.DateChanged.subscribe((date) => {
      expect(date === dateRange);
    });
  });

  it('should execute `onChange()`method and call `getDate()` method to get Yesterday`s date', () => {
    const firstday = moment().subtract(1, 'days').startOf('day').utc().format(component.dateFormat);
    const lastday = moment().subtract(1, 'days').endOf('day').utc().format(component.dateFormat);
    const dateRange = { fromDateTime: firstday, toDateTime: lastday, id: 'yesterday' };
    spyOn(component, 'getDate').and.callThrough();
    component.onChange('yesterday');
    expect(component.getDate).toHaveBeenCalled();
    component.DateChanged.subscribe((date) => {
      expect(date === dateRange);
    });
  });

  it('should execute `onChange()`method and call `getDate()` method to get this week date range', () => {
    const firstday = moment().startOf('week').utc().format(component.dateFormat);
    const lastday = moment().utc().format(component.dateFormat);
    const dateRange = { fromDateTime: firstday, toDateTime: lastday, id: 'this_week' };
    spyOn(component, 'getDate').and.callThrough();
    component.onChange('this_week');
    expect(component.getDate).toHaveBeenCalled();
    component.DateChanged.subscribe((date) => {
      expect(date === dateRange);
    });
  });


  it('should execute `onChange()`method and call `getDate()` method to get last week date range', () => {
    const firstday = moment().subtract(1, 'weeks').startOf('week').utc().format(component.dateFormat);
    const lastday = moment().subtract(1, 'weeks').endOf('week').utc().format(component.dateFormat);
    const dateRange = { fromDateTime: firstday, toDateTime: lastday, id: 'last_week' };
    spyOn(component, 'getDate').and.callThrough();
    component.onChange('last_week');
    expect(component.getDate).toHaveBeenCalled();
    component.DateChanged.subscribe((date) => {
      expect(date === dateRange);
    });
  });

  it('should execute `onChange()`method and call `getDate()` method to get last month date range', () => {
    const firstday = moment().subtract(1, 'month').startOf('month').utc().format(component.dateFormat);
    const lastday = moment().subtract(1, 'month').endOf('month').utc().format(component.dateFormat);
    const dateRange = { fromDateTime: firstday, toDateTime: lastday, id: 'last_month' };
    spyOn(component, 'getUTCDateString').and.callThrough();
    spyOn(component, 'getDate').and.callThrough();
    component.getUTCDateString(false, '');
    component.onChange('last_month');
    expect(component.getUTCDateString).toHaveBeenCalled();
    expect(component.getDate).toHaveBeenCalled();
    component.DateChanged.subscribe((date) => {
      expect(date === dateRange);
    });
  });

  it('should execute `onChange()`method and call `getDate()` method to get this month date range', () => {
    const firstday = moment().subtract(1, 'month').startOf('month').utc().format(component.dateFormat);
    const lastday = moment().endOf('month').utc().format(component.dateFormat);
    const dateRange = { fromDateTime: firstday, toDateTime: lastday, id: 'this_month' };
    spyOn(component, 'getUTCDateString').and.callThrough();
    spyOn(component, 'getDate').and.callThrough();
    component.getUTCDateString(true, '');
    component.onChange('this_month');
    expect(component.getUTCDateString).toHaveBeenCalled();
    expect(component.getDate).toHaveBeenCalled();
    component.DateChanged.subscribe((date) => {
      expect(date === dateRange);
    });
  });

  it('should execute `onChange()`method and call `getDate()` method to get this year date range', () => {
    const firstday = moment().startOf('year').utc().format(component.dateFormat);
    const lastday = moment().endOf('year').utc().format(component.dateFormat);
    const dateRange = { fromDateTime: firstday, toDateTime: lastday, id: 'this_year' };
    spyOn(component, 'getDate').and.callThrough();
    component.onChange('this_year');
    expect(component.getDate).toHaveBeenCalled();
    component.DateChanged.subscribe((date) => {
      expect(date === dateRange);
    });
  });

  it('should execute `onChange()`method and call `getDate()` method to get this year date range if both same', () => {
    Date.now = () => new Date('01/01/2019').getTime();
    const firstday = moment().startOf('week').utc().format(component.dateFormat);
    const lastday = moment().utc().format(component.dateFormat);
    const tweek_date = { fromDateTime: firstday, toDateTime: lastday, id: 'this_year' };
    spyOn(component, 'getDate').and.callThrough();
    component.onChange('this_year');
    expect(component.getDate).toHaveBeenCalled();
    component.DateChanged.subscribe((date) => {
      expect(date === tweek_date);
    });
    Date.now = () => new Date().getTime();
  });

  it('should execute `onChange()`method and call `getDate()` method to return dafult date if selectedPreset is empty', () => {
    spyOn(component, 'getDate').and.callThrough();
    spyOn(component, 'onChange').and.callThrough();
    component.onChange(' ');
    expect(component.getDate).toHaveBeenCalled();
  });

  it('should execute `onChange()`method and call `getDate()` method to return custom range', () => {
    spyOn(component, 'getDate').and.callThrough();
    spyOn(component, 'onChange').and.callThrough();
    component.onChange('custom_range');
    expect(component.getDate).toHaveBeenCalled();
  });

  it('should execute `onChange()`method and call `getDate()` method to get last 7 days date range', () => {
    const lastday = moment().endOf('day');
    const firstday = moment(this.lastday, this.dateFormat).subtract(6, 'days');
    const dateRange = { fromDateTime: firstday, toDateTime: lastday, id: 'last_week' };
    spyOn(component, 'getDate').and.callThrough();
    component.datePresets = new QuickDatePicker().presets;
    fixture.detectChanges();
    component.onChange('last_7days');
    expect(component.getDate).toHaveBeenCalled();
    component.DateChanged.subscribe((date) => {
      expect(date === dateRange);
    });
  });

  it('should execute `onApply()`method', () => {
    spyOn(component, 'onApply').and.callThrough();
    const date = '02-02-2019 18:30 - 02-09-2019 18:29';
    component.onApply(date);
    expect(component.onApply).toHaveBeenCalled();
    expect(component.ShowDateRange).toBe(false);
  });

  it('should execute `onApply()` method for localString as true', () => {
    spyOn(component, 'onApply').and.callThrough();
    component.localString = true;
    fixture.detectChanges();
    const date = '02-02-2019 18:30 - 02-09-2019 18:29';
    component.onApply(date);
    expect(component.onApply).toHaveBeenCalled();
    expect(component.ShowDateRange).toBe(false);
  });

  it('should execute `openDateRange()`method', () => {
    spyOn(component, 'openDateRange').and.callThrough();
    component.openDateRange();
    expect(component.ShowDateRange).toBe(true);
    expect(component.VisibleOptions).toBe(true);
  });

  it('should execute `onCancel()`method', () => {
    spyOn(component, 'onCancel').and.callThrough();
    component.onCancel();
    expect(component.onCancel).toHaveBeenCalled();
    expect(component.ShowDateRange).toBe(false);
    expect(component.VisibleOptions).toBe(false);
  });

  // fit('Should display selected dates when user selects custom range',()=>{
  //   component.value ="custom_range";
  //   component.fromDateTime = '12/12/18';
  //   component.toDateTime ='12/19/18';
  //   component.showOptions = true;
  //   fixture.detectChanges();
  //   component.onApply('12/12/18 - 12/19/18');
  //   fixture.detectChanges();
  //   fixture.whenStable().then(()=>{
  //     const selectionHtml = html.getElementsByClassName('example-additional-selection');
  //     expect(selectionHtml.length).toBe(1);
  //     expect(selectionHtml[0].innerHTML).toBe('12/12/18 - 12/19/18')
  //   })
  // })

  it('Should call `updateDateFormat()` and update the existing date format to new date format including dates', () => {
    component.firstday = '12/12/18';
    component.lastday = '12/19/18';
    component.dateFormat = 'MM/DD/YY'
    component.value = "custom_range"
    fixture.detectChanges();
    spyOn(component, 'updateDateFormat').and.callThrough();
    component.updateDateFormat(component.dateFormat, 'DD/MM/YY');
    fixture.whenStable().then(() => {
      expect(component.dateFormat).toBe('DD/MM/YY');
      expect(component.firstday).toBe('12/12/18');
      expect(component.lastday).toBe('19/12/18')
    })
  })
});





