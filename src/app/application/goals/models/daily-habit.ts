import * as moment from 'moment';
import {Moment} from 'moment';

export class DailyHabit {
  public everyday;
  public from: Moment;
  public to: Moment;
  public everyNDays = 1;
  public specificDays: number[] = [];
  public dailyChecklist: number[] = [];

  constructor(from: Moment, to: Moment, everyday = true) {
    this.everyday = everyday;
    this.from = from;
    this.to = to;
  }

  getDaysDifference(): number {
    let diff = this.to.diff(this.from, 'days') + 1;
    if (this.everyNDays) {
      diff = Math.ceil(diff / this.everyNDays);
    } else {
      const from = moment(this.from);
      const to = moment(this.to);

      let errorLimiter = 0;
      while (from <= to) {
        if (!this.specificDays.includes(from.day())) {
          diff--;
        }

        from.add(1, 'days');

        if (errorLimiter++ > 500) {
          console.log(this);
          throw new Error('DailyHabit has corrupted data.');
        }
      }
    }
    return diff;
  }

  isEmpty() {
    return this.dailyChecklist.length > 0;
  }

  fillDailyChecklist() {
    this.dailyChecklist = new Array(this.getDaysDifference()).fill(0);
  }

  toggleSpecificDay(dayNum: number) {
    const i = this.specificDays.indexOf(dayNum);
    if (i === -1) {
      this.specificDays.push(dayNum);
    } else {
      this.specificDays.splice(i, 1);
    }
  }

  includesDay(i: number) {
    if (this.specificDays == null) {
      return false;
    } else {
      return this.specificDays.includes(i);
    }
  }

  areSpecificDaysDefined(): boolean {
    if (this.specificDays == null) {
      return false;
    }
    if (this.specificDays.length > 0) {
      this.everyNDays = null;
      this.everyday = false;
      return true;
    } else {
      return false;
    }
  }

  static empty(): DailyHabit {
    return new DailyHabit(moment(), moment());
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
