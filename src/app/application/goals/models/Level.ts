import {Moment} from 'moment';
import {CheckList} from './Checklist';
import {DailyHabit} from './daily-habit';
import {Goal} from './Goal';
import * as moment from 'moment';

export class Level {
  level: number;
  name: string;
  reward: string;
  achieved: boolean;
  achievedAt: Moment;
  achievedProof: String;
  toBeDoneAt: string;

  constructor(level: number, name: string, reward: string = '', achieved: boolean = false) {
    this.name = name;
    this.reward = reward;
    this.level = level;
    this.achieved = achieved;
  }

  static empty() {
    return new Level(0, '', '');
  }

  static deserialize(object: any): Level {
    const level = this.empty();
    Object.assign(level, object);
    if (object.achievedAt) {
      level.achievedAt = moment(object.achievedAt);
    }
    return level;
  }
}
