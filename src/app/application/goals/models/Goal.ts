import {logging} from 'selenium-webdriver';
import {Level} from './Level';
import {CheckList} from './Checklist';

export class Goal {
  id: number;
  name: string;
  levels: Level[];
  checklist: CheckList;

  constructor(name: string, levels: Level[]) {
    this.name = name;
    this.levels = levels;
  }

  static empty() {
    const emptyGoal = new Goal('',  []);
    emptyGoal.levels = [];
    emptyGoal.checklist = CheckList.empty();
    return emptyGoal;
  }
}
