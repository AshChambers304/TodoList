import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  public calHidden = true;

  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public date: Date = new Date();
  public day = this.date.getDate();
  public month = this.date.getMonth();
  public year = this.date.getFullYear();

  public selectedDate = this.date;
  public selectedDay = this.day;
  public selectedMonth = this.month;
  public selectedYear = this.year;

  constructor() {}

  toggleCal(): void {
    if (this.calHidden == true) {
      this.calHidden = false;
    } else this.calHidden = true;
  }

  nxtMonthClicked(): void {
    if (this.month >= 11) {
      this.month = 0;
      this.year++;
    } else this.month++;
  }

  prevMonthClicked(): void {
    if (this.month <= 0) {
      this.month = 11;
      this.year--;
    } else this.month--;
  }

  ngOnInit(): void {}
}
