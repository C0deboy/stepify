import {logging} from 'selenium-webdriver';
import {Level} from './Level';

export class Goal {
  id: number;
  name: string;
  levels: Level[];
}
