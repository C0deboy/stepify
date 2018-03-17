import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DailyHabit} from '../../goals/models/DailyHabit';
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

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calendar = [[]];
    this.currentMonth = 0;

    const from = moment(this.dailyHabit.from);
    const to = moment(this.dailyHabit.to);

    while (from <= to) {
      const lastMonth = from.month();

      if (this.dailyHabit.everyNDays) {
        this.checkIfNextMonth(from, lastMonth);
        this.addToCalendar(from);
        from.add(this.dailyHabit.everyNDays, 'days');
      } else {
        while (!this.dailyHabit.specificDays.includes(from.day())) {
          from.add(1, 'days');
        }
        if (this.dailyHabit.specificDays.includes(from.day())) {
          this.checkIfNextMonth(from, lastMonth);
          this.addToCalendar(from);
          from.add(1, 'days');
        }
      }
    }
  }

  private addToCalendar(from: Moment) {
    const lastIndex = this.calendar.length - 1;
    this.calendar[lastIndex].push(moment(from));
  }

  private checkIfNextMonth(from: Moment, lastMonth: number) {
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
