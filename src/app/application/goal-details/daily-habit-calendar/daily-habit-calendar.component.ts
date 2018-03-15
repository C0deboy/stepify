import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DailyHabit} from '../../goals/models/DailyHabit';

@Component({
  selector: 'app-daily-habit-calendar',
  templateUrl: './daily-habit-calendar.component.html',
  styleUrls: ['./daily-habit-calendar.component.css']
})
export class DailyHabitCalendarComponent implements OnChanges {
  @Input()
  private dailyHabit: DailyHabit;
  public datesInRange: Date[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.datesInRange = [];
    const from = new Date(this.dailyHabit.from);
    const to = new Date(this.dailyHabit.to);

    while (from <= to) {
      this.datesInRange.push(new Date(from));

      from.setDate(from.getDate() + 1);
    }

  }



}
