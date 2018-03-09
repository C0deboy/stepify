export class Level {
  level: number;
  name: string;
  reward: string;
  achieved: boolean;

  constructor(level: number, name: string, reward: string) {
    this.name = name;
    this.reward = reward;
    this.level = level;
  }
}
