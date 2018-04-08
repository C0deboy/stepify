import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DailyHabit} from '../../goals/models/daily-habit';
import * as moment from 'moment';
import {Moment} from 'moment';

@Component({
  selector: 'app-daily-habit-calendar',
  templateUrl: './daily-habit-calendar.component.html',
  styleUrls: ['./daily-habit-calendar.component.css']
})

export class DailyHabitCalendarComponent implements OnChanges {
  @Input()
  public dailyHabit: DailyHabit;
  public calendar: Array<Array<Moment>> = [];
  public currentMonth = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.buildCalendar();
  }

  public buildCalendar() {
    this.calendar = [[]];
    this.currentMonth = 0;

    const from = moment(this.dailyHabit.from);
    const to = moment(this.dailyHabit.to);

    let lastMonth = from.month();
    while (from <= to) {
      this.addNewMonthToCallendarIfNextMonth(from, lastMonth);
      lastMonth = from.month();

      if (this.dailyHabit.everyNDays) {
        this.addToCalendar(from);
        from.add(this.dailyHabit.everyNDays, 'days');
      } else {
        if (this.dailyHabit.specificDays.includes(from.day())) {
          this.addToCalendar(from);
        }
        this.skipUnwantedDays(from);
      }
    }
  }

  private skipUnwantedDays(from) {
    do {
      from.add(1, 'days');
    }
    while (!this.dailyHabit.specificDays.includes(from.day()));
  }

  private addToCalendar(from: Moment) {
    const lastIndex = this.calendar.length - 1;
    this.calendar[lastIndex].push(moment(from));
  }

  private addNewMonthToCallendarIfNextMonth(from: Moment, lastMonth: number) {
    if (from.month() !== lastMonth) {
      this.calendar.push([]);
    }
  }

  toggleDone(i) {
    const startingIndex = this.resolveStartingIndex();
    let done: number = this.dailyHabit.dailyChecklist[startingIndex + i];
    done = done === 0 ? 1 : 0;

    this.dailyHabit.dailyChecklist[startingIndex + i] = done;
  }

  private resolveStartingIndex(): number {
    let startingIndex = 0;
    let nthMonth = this.currentMonth;
    while (nthMonth > 0) {
      startingIndex += this.calendar[nthMonth - 1].length;
      nthMonth--;
    }
    return startingIndex;
  }

  previousMonth() {
    if (this.currentMonth > 0) {
      this.currentMonth--;
    }
  }

  nextMonth() {
    if (this.currentMonth < this.calendar.length - 1) {
      this.currentMonth++;
    }
  }

  checkIfDone(i): boolean {
    const done = this.dailyHabit.dailyChecklist[this.resolveStartingIndex() + i] === 1;
    return done;
  }

  checkIfFuture(date: Moment) {
    return date.isAfter();
  }
}
