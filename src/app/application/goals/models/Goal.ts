import {Level} from './Level';
import {CheckList} from './Checklist';
import {DailyHabit} from './daily-habit';
import {Moment} from 'moment';

export class Goal {
  id: String;
  name: String;
  levels: Level[];
  checklist: CheckList;
  dailyHabit: DailyHabit;
  achieved: boolean;
  inspiredBy: String;
  inspiredByLink: String;
  order: number;


  constructor(name: string = '', levels: Level[] = []) {
    this.name = name;
    this.levels = levels;
  }

  getAwards(): String[] {
    return this.levels.filter(l => l.reward !== '').map(level => level.reward);
  }

  isDailyHabitDefined() {
    return this.dailyHabit && this.dailyHabit.isEmpty();
  }

  isCheckListDefined() {
    return this.checklist && this.checklist.isEmpty();
  }

  addLevel(newLevel: Level) {
    this.levels.push(newLevel);
  }

  removeLevel(index: number) {
    this.levels.splice(index, 1);
    this.levels.forEach((level, i) => level.level = i + 1);
  }

  static empty() {
    const emptyGoal = new Goal('', []);
    emptyGoal.levels = [];
    emptyGoal.checklist = CheckList.empty();
    emptyGoal.dailyHabit = DailyHabit.empty();
    return emptyGoal;
  }

  static deserialize(object: any): Goal {
    const goal = new Goal();
    Object.assign(goal, object);
    goal.dailyHabit = DailyHabit.deserialize(object.dailyHabit);
    goal.levels = object.levels.map(level => Level.deserialize(level));
    if (object.checklist) {
      goal.checklist = new CheckList(object.checklist.name, object.checklist.list);
    }
    return goal;
  }
}
