export class Level {
  id: number;
  name: string;
  reward: string;
  achieved: boolean;

  constructor(name: string, reward: string) {
    this.name = name;
    this.reward = reward;
  }
}
