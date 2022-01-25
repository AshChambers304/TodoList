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
  public hoursHidden = true;

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
  public hour = this.date.getHours();
  public minute = this.date.getMinutes();

  public selectedDate = this.date;
  public selectedDay = this.day;
  public selectedMonth = this.month;
  public selectedYear = this.year;
  public selectedHour = this.hour;
  public selectedMinute = this.minute;

  constructor(private renderer: Renderer2) {}

  @Output() selectedDateEmitter: EventEmitter<Date> = new EventEmitter<Date>();

  ngOnInit(): void {
    this.populateDates();
    this.populateHours();
    this.populateMinutes();
    this.toggleMenu(['date-time-picker']);
    this.toggleMenu(['hour-picker']);
    this.toggleMenu(['minute-picker']);
  }

  toggleMenu(elementIDs: string[]): void {
    for (let i = 0; i < elementIDs.length; i++) {
      let elementToToggle = document.getElementById(elementIDs[i]);

      if (elementToToggle) {
        if (elementToToggle.classList.contains('hidden')) {
          this.renderer.removeClass(elementToToggle, 'hidden');
        } else this.renderer.addClass(elementToToggle, 'hidden');
      }
    }
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
    let dayElements = document.getElementsByClassName('day');

    while (dayElements.length > 0) {
      dayElements[0].parentNode?.removeChild(dayElements[0]);
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
        this.day = i + 1;
        this.changeSelectedDate();
      });
    }
  }

  populateHours(): void {
    let hourElements = document.getElementsByClassName('hour');

    while (hourElements.length > 0) {
      hourElements[0].parentNode?.removeChild(hourElements[0]);
    }

    for (let i = 0; i < 24; i++) {
      const hourElement = this.renderer.createElement('li');
      this.renderer.addClass(hourElement, 'hour');

      const text = this.renderer.createText(this.minTwoDigits(i.toString()));

      this.renderer.appendChild(hourElement, text);
      this.renderer.appendChild(
        document.getElementsByClassName('hours')[0],
        hourElement
      );

      if (this.selectedHour == i) {
        this.renderer.addClass(hourElement, 'selected');
      }

      this.renderer.listen(hourElement, 'click', (event) => {
        this.hour = i;
        this.toggleMenu(['selected-hour', 'hour-picker']);
        this.changeSelectedDate();
      });
    }
  }

  populateMinutes(): void {
    let minuteElements = document.getElementsByClassName('minute');

    while (minuteElements.length > 0) {
      minuteElements[0].parentNode?.removeChild(minuteElements[0]);
    }

    for (let i = 0; i < 60; i++) {
      const minuteElement = this.renderer.createElement('li');
      this.renderer.addClass(minuteElement, 'minute');

      const text = this.renderer.createText(this.minTwoDigits(i.toString()));

      this.renderer.appendChild(minuteElement, text);
      this.renderer.appendChild(
        document.getElementsByClassName('minutes')[0],
        minuteElement
      );

      if (this.selectedMinute == i) {
        this.renderer.addClass(minuteElement, 'selected');
      }

      this.renderer.listen(minuteElement, 'click', (event) => {
        this.minute = i;
        this.toggleMenu(['selected-minute', 'minute-picker']);
        this.changeSelectedDate();
      });
    }
  }

  changeSelectedDate() {
    let newDate = new Date(
      `${this.year}-${this.minTwoDigits(this.month + 1)}-${this.minTwoDigits(
        this.day
      )}T${this.minTwoDigits(this.hour)}:${this.minTwoDigits(this.minute)}:00Z`
    );

    this.selectedDate = newDate;
    this.selectedDay = this.day;
    this.selectedMonth = this.month;
    this.selectedYear = this.year;
    this.selectedHour = this.hour;
    this.selectedMinute = this.minute;
    this.renderer.setAttribute(
      document.getElementById('prevDate'),
      'dataset',
      this.selectedDate.toString()
    );
    this.populateDates();
    this.populateHours();
    this.selectedDateEmitter.emit(this.selectedDate);
  }

  getLastDayOfMonth(): number {
    let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    return daysInMonth;
  }

  minTwoDigits(n: any) {
    return (n < 10 ? '0' : '') + n;
  }
}
