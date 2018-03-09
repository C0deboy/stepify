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
  @Output()
  showGoalDetailsEvent = new EventEmitter<Goal>();

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
    this.showGoalDetailsEvent.emit(goal);
  }
}
