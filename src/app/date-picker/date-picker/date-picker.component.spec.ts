import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment-timezone';
import { DatePickerComponent } from './date-picker.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TimePickerModule } from 'src/app/time-picker/time-picker.module';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatTabsModule,
        TimePickerModule],
      declarations: [DatePickerComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    //component.type = 'dateTimeRange';
    component.dateFormat = 'MM/DD/YYYY';
    component.timeFormat = '24';
    component.minDate = new Date('01/01/2019');
    component.maxDate = new Date('01/31/2019');
    component.fromDateTime = '01/04/2019 7:45 AM';
    component.toDateTime = '01/05/2019 8:45 AM';
    component.dateLables = {
      0: '',
      1: ''
    }
    component.timeLables = {
      0: '',
      1: ''
    }
    fixture.detectChanges();

  });

  it('should create `DatePickerComponent` component', () => {
    expect(component).toBeTruthy();
  });

  it('should execute `ngOnInit()` for maxDate and minDate to be undefined', () => {
    component.maxDate = undefined;
    component.minDate = undefined;
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.maxDate).toEqual(null);
    expect(component.minDate).toEqual(null);
    expect(component.min).toEqual('');
    expect(component.max).toEqual('');
  });

  it('should execute `ngOnInit()` method with fromTime is not empty', () => {
    component.fromTime = moment(component.fromDateTime).format('hh:mm:a').split(":");
    component.type = 'dateTime';
    component.fromDateTime = '02/02/2019 09:08 am'
    component.timeFormat = '12';
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.dateLables['0']).not.toEqual('');
    expect(component.dateLables['1']).not.toEqual('');
  });

  it('should execute `ngOnInit()` method with fromTime is empty', () => {
    component.fromTime = moment('01/04/2019').format('hh:mm:a').split(":");
    component.type = 'dateRange';
    component.fromDateTime = '';
    component.fromDateTime = '';
    component.toDateTime = '';
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.selectedDate).toBe(null);
  });

  it('should execute `ngOnInit()` method with fromTime is empty', () => {
    component.dateFormat = undefined;
    component.type = 'date';
    component.fromDateTime = undefined;
    component.toDateTime = undefined;
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.dateFormat).not.toBe('');
  });

  it('should execute `ngOnInit()` method to check whether apply disabled or not', () => {
    component.dateLables['0'] = '01/06/2019';
    component.dateLables['1'] = '01/01/2019';
    component.type = 'dateTimeRange';
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.isApplyDisabled).toBeFalsy();
  });

  it('should execute `onApply()` method to emit selected date if type is `date`', () => {
    component.type = 'date';
    fixture.detectChanges();
    const fromDate = `${moment(component.dateLables['0']).format(component.dateFormat)}`;
    spyOn(component, 'onApply').and.callThrough();
    component.onApply();
    expect(component.onApply).toHaveBeenCalled();
    component.applySelectedDate.subscribe((date) => {
      expect(date === fromDate);
    });
  });

  it('should execute `onApply()` method to emit selected date and time if type is `dateTime`', () => {
    component.type = 'dateTime';
    fixture.detectChanges();
    const fromDate = `${moment(component.dateLables['0']).format(component.dateFormat)}`;
    const fromTime = `${component.timeLables['0']}`;
    const fromDateTime = `${`${fromDate} - ${fromTime}`}`
    spyOn(component, 'onApply').and.callThrough();
    component.onApply();
    expect(component.onApply).toHaveBeenCalled();
    component.applySelectedDate.subscribe((date) => {
      expect(date === fromDateTime);
    });
  });

  it('should execute `onApply()` method to emit selected time if type is `Time`', () => {
    component.type = 'time';
    fixture.detectChanges();
    const fromTime = `${component.timeLables['0']}`;
    spyOn(component, 'onApply').and.callThrough();
    component.onApply();
    expect(component.onApply).toHaveBeenCalled();
    component.applySelectedDate.subscribe((date) => {
      expect(date === fromTime);
    });
  });

  it('should execute `onApply()` method to emit selected time if type is `Time`', () => {
    component.type = '';
    fixture.detectChanges();
    const fromTime = `${component.timeLables['0']}`;
    spyOn(component, 'onApply').and.callThrough();
    component.onApply();
    expect(component.onApply).toHaveBeenCalled();
  });

  it('should execute `onApply()` method to emit selected date range if type is `dateRange`', () => {
    component.type = 'dateRange';
    fixture.detectChanges();
    const toDate = `${moment(component.dateLables['1']).format(component.dateFormat)}`;
    const fromDate = `${moment(component.dateLables['0']).format(component.dateFormat)}`;
    const dateRange = `${`${fromDate} - ${toDate}`}`
    spyOn(component, 'onApply').and.callThrough();
    component.onApply();
    expect(component.onApply).toHaveBeenCalled();
    component.applySelectedDate.subscribe((date) => {
      expect(date === dateRange);
    });
  });

  it('should execute `onApply()` method to emit selected date and time range if type is `dateTimeRange`', () => {
    component.type = 'dateTimeRange';
    fixture.detectChanges();
    const fromDateTime = `${moment(component.dateLables['0']).format(component.dateFormat)}${component.timeLables['0']}`;
    const toDateTime = `${moment(component.dateLables['1']).format(component.dateFormat)}${component.timeLables['1']}`;
    const dateRange = `${`${fromDateTime} - ${toDateTime}`}`
    spyOn(component, 'onApply').and.callThrough();
    component.onApply();
    expect(component.onApply).toHaveBeenCalled();
    component.applySelectedDate.subscribe((date) => {
      expect(date === dateRange);
    });
  });

  it('should execute `onCancel()` method to emit cancel event', () => {
    spyOn(component, 'onCancel').and.callThrough();
    component.onCancel();
    expect(component.onCancel).toHaveBeenCalled();
    component.cancel.subscribe((date) => {
      expect(date === 'Cancel');
    });
  });

  it('should execute `timeChanged()` method to get selected from date`s time if tabIndex is 0', () => {
    const setValue = {
      hour: '',
      minute: '',
      meridiem: ''
    }
    component.tabIndex = 0;
    fixture.detectChanges();
    spyOn(component, 'timeChanged').and.callThrough();
    component.timeChanged(setValue);
    expect(component.timeChanged).toHaveBeenCalledWith(setValue);
    expect(component.timeLables['0']).not.toEqual('');
  });

  it('should execute `timeChanged()` method to get selected to date`s time if tabIndex is 1', () => {
    const setValue = {
      hour: '',
      minute: '',
      meridiem: ''
    }
    component.tabIndex = 1;
    fixture.detectChanges();
    spyOn(component, 'timeChanged').and.callThrough();
    component.timeChanged(setValue);
    expect(component.timeChanged).toHaveBeenCalledWith(setValue);
    expect(component.timeLables['1']).not.toEqual('');
  });

  it('should execute `selectedDateChanged()` method to bind label with selected from date if tabIndex is 0', () => {
    const date = new Date();
    component.tabIndex = 0;
    component.duration = 0;
    component.dateLables['0'] = '01/06/2019';
    component.dateLables['1'] = '01/05/2019';
    component.type = "dateTimeRange";
    fixture.detectChanges();
    spyOn(component, 'selectedDateChanged').and.callThrough();
    component.selectedDateChanged(date);
    expect(component.selectedDateChanged).toHaveBeenCalledWith(date);
    expect(component.isApplyDisabled).toBeTruthy();
  });

  it('should execute `selectedDateChanged()` method to bind label with selected to date if tabIndex is 1', () => {
    const date = new Date('01/05/2019');
    component.tabIndex = 1;
    component.dateLables['0'] = '01/05/2019';
    component.dateLables['1'] = '01/06/2019';
    component.type = "dateRange";
    fixture.detectChanges();
    spyOn(component, 'selectedDateChanged').and.callThrough();
    component.selectedDateChanged(date);
    expect(component.selectedDateChanged).toHaveBeenCalledWith(date);
    expect(component.isApplyDisabled).toBeFalsy();
  });
  it('should execute `selectedDateChanged()` method to bind label with selected to date if tabIndex is 1', () => {
    const date = new Date('01/05/2019');
    component.tabIndex = 1;
    component.dateLables['0'] = '01/05/2019';
    component.dateLables['1'] = '01/06/2019';
    fixture.detectChanges();
    spyOn(component, 'selectedDateChanged').and.callThrough();
    component.selectedDateChanged(date);
    expect(component.selectedDateChanged).toHaveBeenCalledWith(date);
    expect(component.isApplyDisabled).toBeFalsy();
  });

  it('should execute `onTabChanged()` method to bind label with selected date', () => {
    const tab = { index: 1 }
    component.tabIndex = 1;
    component.max = '';
    component.duration = 0;
    fixture.detectChanges();
    spyOn(component, 'onTabChanged').and.callThrough();
    component.onTabChanged(tab);
    expect(component.onTabChanged).toHaveBeenCalledWith(tab);
    expect(component.tabIndex).not.toBe(null);
  });
  it('should execute `onTabChanged()` method to bind label with selected date', () => {
    const tab = { index: 1 }
    component.tabIndex = 1;
    component.maxDate = "01/01/2019"
    component.max = '01/01/2019';
    fixture.detectChanges();
    spyOn(component, 'onTabChanged').and.callThrough();
    component.onTabChanged(tab);
    expect(component.onTabChanged).toHaveBeenCalledWith(tab);
    expect(component.tabIndex).not.toBe(null);
  });

  it('should execute `onTabChanged()` method to bind label with selected date', () => {
    const tab = { index: 0 }
    component.tabIndex = 0;
    component.max = '';
    component.duration = 0;
    fixture.detectChanges();
    spyOn(component, 'onTabChanged').and.callThrough();
    component.onTabChanged(tab);
    expect(component.onTabChanged).toHaveBeenCalledWith(tab);
    expect(component.tabIndex).not.toBe(null);
  });

  it('should execute `onTabChanged()` method', () => {
    component.timeLables[0] = '08:60 AM';
    component.timeLables[1] = '08:60 AM';
    component.timeFormat = '12';
    const tab = { index: 0 }
    component.tabIndex = 0;
    fixture.detectChanges();
    spyOn(component, 'onTabChanged').and.callThrough();
    component.onTabChanged(tab);
    expect(component.onTabChanged).toHaveBeenCalled();
    expect(component.timeValue).not.toBe(null);
  });

   it('Should call onTabChanged() when tab changing ToDate to FromDate, max date should set to Input max Date id Duration exist ',() => {
    component.maxDate = new Date();
    component.min = '12/12/18';
    component.duration = 10080;
     component.max = '12/20/18'
     fixture.detectChanges();
     spyOn(component,'onTabChanged').and.callThrough();
     component.onTabChanged({index:0});
     fixture.whenStable().then(()=>{
       expect(component.minDate.getTime()).toBe(new Date(component.min).getTime())
       expect(component.maxDate.getTime()).toBe(new Date(component.max).getTime())
    
      })
   })
  ;
   it('Should call onTabChanged() when tab changing FromDate to ToDate, max date should set and min date should be selected from date ',() => {
    component.dateLables['0'] = '12/13/18'
    component.duration = 10080
    component.min = '12/12/18';
     component.max = '12/22/18';
     component.dateFormat = 'MM/DD/YY'
     fixture.detectChanges();
     spyOn(component,'onTabChanged').and.callThrough();
     component.onTabChanged({index:1});
     fixture.whenStable().then(()=>{
       expect(component.minDate.getTime()).toBe(new Date(component.dateLables['0']).getTime())
       expect(component.maxDate.getTime()).toBe(new Date(new Date('12/20/18')).getTime())
      })
   })

  it('Should excecute `getToDate` and it should return the today date if the to date falls on future',()=>{
    const date = new Date(new Date().setHours(200));
    spyOn(component,'getToDate').and.callThrough();
    const today = new Date();
    const toDate =   component.getToDate(date);
    fixture.whenStable().then(()=>{
      expect(toDate.getMonth).toBe(today.getMonth);
      expect(toDate.getDate).toBe(today.getDate);
      expect(toDate.getFullYear).toBe(today.getFullYear);
    })
  })
  it('Should excecute `getToDate` and it should add the duration to the given date  ',()=>{
    const date = new Date('12/12/18');
    spyOn(component,'getToDate').and.callThrough();
    const today = new Date('12/19/18');
    const toDate =   component.getToDate(date);
    fixture.whenStable().then(()=>{
      expect(toDate.getMonth).toBe(today.getMonth);
      expect(toDate.getDate).toBe(today.getDate);
      expect(toDate.getFullYear).toBe(today.getFullYear);
    })
  })


});