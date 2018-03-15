export class DailyHabit {
  public today = new Date();
  public everyday: boolean;
  public from: Date;
  public to: Date;


  constructor(from: Date, to: Date, everyday = false ) {
    this.everyday = everyday;
    this.from = from;
    this.to = to;
  }

  static empty() {
    return new DailyHabit(new Date(), new Date());
  }
}
