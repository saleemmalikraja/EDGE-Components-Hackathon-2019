import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'EDGEComponentsHackathon2019';
  quickDateFilter = ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'This Year', 'Custom Range'];
  fromDate: string;
  toDate: string;
  minDate: string;
  maxDate: string;
  dateFormat: string;
  firstdate: string;
  lastdate: string;
  dateFormatToLocal = 'MM/dd/yy hh:mm:ss a';

  constructor(
    private datePipe: DatePipe) {

  }
  ngOnInit() {
    this.dateFormat = 'MM/DD/YY';
    this.minDate = this.datePipe.transform(new Date(2018, 0, 1), this.dateFormatToLocal);
    this.maxDate = this.datePipe.transform(new Date(), this.dateFormatToLocal);
    this.fromDate = this.datePipe.transform(new Date().setDate(new Date().getDate() - 7), this.dateFormatToLocal);
    this.toDate = this.datePipe.transform(new Date(), this.dateFormatToLocal);
  }

  getDateForFilter(date) {
    if (this.dateFormat === "DD/MM/YY") {
      this.firstdate = new Date(this.getFormattedDate(date['fromDateTime'])).toISOString();
      this.lastdate = new Date(this.getFormattedDate(date['toDateTime'])).toISOString();
    } else {
      this.firstdate = new Date(date['fromDateTime']).toISOString();
      this.lastdate = new Date(date['toDateTime']).toISOString();
    }
  }

  /**
   * get date format as MM-DD-YY
   */
  getFormattedDate(date) {
    const month = date.split('/')[1];
    const day = date.split('/')[0];
    const year = date.split('/')[2];
    return `${month}/${day}/${year}`;
  }

}
