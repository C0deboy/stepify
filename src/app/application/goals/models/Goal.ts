import {Level} from './Level';
import {CheckList} from './Checklist';
import {DailyHabit} from './daily-habit';

export class Goal {
  id: String;
  name: String;
  levels: Level[];
  checklist: CheckList;
  dailyHabit: DailyHabit = DailyHabit.empty();
  achieved = false;

  constructor(name: string = '', levels: Level[] = []) {
    this.name = name;
    this.levels = levels;
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
    if (object.checklist) {
      goal.checklist = new CheckList(object.checklist.name, object.checklist.list);
    }
    return goal;
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
}
