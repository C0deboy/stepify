export class Level {
  level: number;
  name: string;
  reward: string;
  achieved: boolean;

  constructor(level: number, name: string, reward: string = '', achieved: boolean = false) {
    this.name = name;
    this.reward = reward;
    this.level = level;
    this.achieved = achieved;
  }

  static empty() {
    return new Level(0, '', '');
  }
}
