import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';
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

  public previewDate = this.formatDate(this.date);

  public selectedDate = this.date;
  public selectedDay = this.day;
  public selectedMonth = this.month;
  public selectedYear = this.year;

  constructor(private renderer: Renderer2) {}

  @Output() selectedDateEmitter: EventEmitter<Date> = new EventEmitter<Date>();

  ngOnInit(): void {
    this.populateDates();
  }

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

    this.populateDates();
  }

  prevMonthClicked(): void {
    if (this.month <= 0) {
      this.month = 11;
      this.year--;
    } else this.month--;

    this.populateDates();
  }

  populateDates(): void {
    let elementsToRemove = document.getElementsByClassName('day');
    while (elementsToRemove.length > 0) {
      elementsToRemove[0].parentNode?.removeChild(elementsToRemove[0]);
    }

    for (let i = 0; i < this.getLastDayOfMonth(); i++) {
      const dayElement = this.renderer.createElement('div');
      this.renderer.addClass(dayElement, 'day');

      const text = this.renderer.createText((i + 1).toString());

      this.renderer.appendChild(dayElement, text);
      this.renderer.appendChild(
        document.getElementsByClassName('days')[0],
        dayElement
      );

      if (
        this.selectedDay == i + 1 &&
        this.selectedYear == this.year &&
        this.selectedMonth == this.month
      ) {
        this.renderer.addClass(dayElement, 'selected');
      }

      this.renderer.listen(dayElement, 'click', (event) => {
        this.changeSelectedDate(i + 1);
      });
    }
  }

  changeSelectedDate(newDay: number) {
    this.selectedDate = new Date(
      this.year + '-' + (this.month + 1) + '-' + newDay
    );
    this.selectedDay = newDay;
    this.selectedMonth = this.month;
    this.selectedYear = this.year;
    this.previewDate = this.formatDate(this.selectedDate);
    this.renderer.setAttribute(
      document.getElementById('prevDate'),
      'dataset',
      this.selectedDate.toString()
    );
    this.populateDates();
    this.selectedDateEmitter.emit(this.selectedDate);
  }

  getLastDayOfMonth(): number {
    let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    return daysInMonth;
  }

  minTwoDigits(n: any) {
    return (n < 10 ? '0' : '') + n;
  }

  formatDate(d: Date): string {
    let day = d.getDate();

    let month = d.getMonth();

    let year = d.getFullYear();

    return (
      this.minTwoDigits(day) +
      ' / ' +
      this.minTwoDigits(month + 1) +
      ' / ' +
      year
    );
  }
}
