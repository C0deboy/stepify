import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GoalsService} from './goals.service';
import {Goal} from './models/Goal';
import {Level} from './models/Level';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  public goals: Goal[];

  public activeGoal: Goal = Goal.empty();
  public rewardLevel: Level = Level.empty();

  constructor(private goalsService: GoalsService) { }

  ngOnInit() {
    this.getGoals();
  }

  getGoals() {
    this.goalsService.getGoals().subscribe(
      (goals: Goal[]) => this.goals = goals,
      error => console.log(error),
      () => console.log('Goals fetched.')
      );
  }

  showGoalDetails(goal: Goal) {
    this.activeGoal = goal;
  }

  showAddedGoal($event: Goal) {
    this.goals.push($event);
  }

  removeGoal($event: number) {
    const index: number = this.goals.findIndex(e => e.id === $event);
    this.goals.splice(index, 1);
  }

  showRewardLevel($event: Level) {
    this.rewardLevel = $event;
  }
}
