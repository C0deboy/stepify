import {Moment} from 'moment';
import * as moment from 'moment';
import {Level} from './Level';
import {CheckList} from './Checklist';
import {Goal} from './Goal';

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

  static empty(): DailyHabit {
    return new DailyHabit(moment(), moment());
  }

  getDaysDifference(): number {
    let diff = this.to.diff(this.from, 'days') + 1;
    if (this.everyNDays) {
      diff = Math.ceil(diff / this.everyNDays);
    } else {
      const from = moment(this.from);
      const to = moment(this.to);

      let errorLimiter = 0
      while (from <= to) {
        if (!this.specificDays.includes(from.day())) {
          diff--;
        }

        from.add(1, 'days');

        if (errorLimiter++ > 500) {
          console.log(this);
          throw new Error('DailyHabit has corrupted data.');
        }
        console.log(errorLimiter);
      }
    }
    return diff;
  }

  static deserialize(object: any): DailyHabit {
    if (object === null) {
      return null;
    }
    const dailyHabit = new DailyHabit(moment(object.from), moment(object.to), object.everyday);
    dailyHabit.specificDays = object.specificDays;
    dailyHabit.dailyChecklist = object.dailyChecklist;
    dailyHabit.everyNDays = object.everyNDays;
    return dailyHabit;
  }
}
