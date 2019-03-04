import { Injectable } from '@angular/core';

@Injectable()
export class DateConfigService {
  constructor() { }

  public UTCtoLocalDateConvertor(inputDate: string) {
        if (inputDate === null) {
          return "-";
        }
        //return new Date(dateTime).toLocaleDateString('en-GB', { hour: 'numeric', hour12: true, minute: 'numeric' }).replace(',', '');
        const year = new Date(inputDate).getFullYear();
        const month = new Date(inputDate).getMonth();
        const date = new Date(inputDate).getDate();
        const hours = new Date(inputDate).getHours();
        const minutes = new Date(inputDate).getMinutes();
        const sec = new Date(inputDate).getSeconds();
        const millisec = new Date(inputDate).getMilliseconds();
        const locatDateTimeString = new Date(Date.UTC(year, month, date, hours, minutes, sec, millisec)).toLocaleDateString('en-GB', { hour: 'numeric', hour12: true, minute: 'numeric' }).replace(',', '');
        return locatDateTimeString;
    }

    public LocaltoUTCDateConvetor(inputDate: string) {
        const localDate = new Date(inputDate);
        return new Date( localDate.getTime() + (localDate.getTimezoneOffset() * 60000)).toLocaleDateString('en-US', { hour: 'numeric', hour12: false, minute: 'numeric' }).replace(',', '');
    }
}

export enum types {
    date = 'date',
    time = 'time',
    dateTime = 'dateTime',
    dateRange = 'dateRange',
    dateTimeRange = 'dateTimeRange',
}


