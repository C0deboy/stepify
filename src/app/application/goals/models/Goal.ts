import {logging} from 'selenium-webdriver';
import {Level} from './Level';
import {CheckList} from './Checklist';
import {DailyHabit} from './DailyHabit';

export class Goal {
  id: number;
  name: string;
  levels: Level[];
  checklist: CheckList;
  dailyHabit: DailyHabit;

  constructor(name: string, levels: Level[]) {
    this.name = name;
    this.levels = levels;
  }

  static empty() {
    const emptyGoal = new Goal('',  []);
    emptyGoal.levels = [];
    emptyGoal.checklist = CheckList.empty();
    emptyGoal.dailyHabit = DailyHabit.empty();
    return emptyGoal;
  }
}
