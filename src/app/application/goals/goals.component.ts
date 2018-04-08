import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GoalsService} from './goals.service';
import {Goal} from './models/Goal';
import {Level} from './models/Level';
import {MessageService} from '../../messages/message.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  public goals: Goal[];

  @Input()
  public activeGoal: Goal = Goal.empty();
  public rewardLevel: Level = Level.empty();
  searchText: String;

  constructor(private goalsService: GoalsService, private messageService: MessageService) { }

  ngOnInit() {
    this.getGoals();
  }

  getGoals() {
    this.goalsService.getGoals().subscribe(
      (goals: Goal[]) => this.goals = goals,
      (error: HttpErrorResponse) => {
        console.log(error);
        this.messageService.showErrorMessage('Could not fetch goals. Connection error.');
      },
          () => console.log('Goals fetched.')
      );
  }

  setActiveGoal(goal: Goal) {
    this.activeGoal = goal;
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

  setSearchText($event: String) {
    this.searchText = $event;
  }
}
