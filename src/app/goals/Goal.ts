import {logging} from 'selenium-webdriver';
import {Level} from './Level';
import {CheckList} from './CheckList';

export class Goal {
  id: number;
  name: string;
  levels: Level[];
  checklist: CheckList;
}
