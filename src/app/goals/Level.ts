export class Level {
  id: number;
  name: string;
  icon: string;
  reward: string;

  constructor(name: string, reward: string, icon: string) {
    this.name = name;
    this.reward = reward;
    this.icon = icon;
  }
}
