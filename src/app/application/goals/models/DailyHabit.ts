import {Moment} from 'moment';
import * as moment from 'moment';

export class DailyHabit {
  public everyday;
  public from: Moment;
  public to: Moment;
  public everyNDays = 1;
  public specificDays: number[] = [];
  public dailyChecklist: number[] = [];

  constructor(from: Moment, to: Moment, everyday = true ) {
    this.everyday = everyday;
    this.from = from;
    this.to = to;
  }

  static empty() {
    return new DailyHabit(moment(), moment());
  }
}
