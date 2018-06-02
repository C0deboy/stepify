import {Component, Input, OnInit} from '@angular/core';
import {GoalsService} from './goals.service';
import {Goal} from './models/Goal';
import {Level} from './models/Level';
import {MessageService} from '../../messages/message.service';
import {HttpErrorResponse} from '@angular/common/http';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('* => *', [
        query(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          stagger('100ms', [
            animate('100ms ease-in',
              style({
                transform: 'translateX(0)', opacity: 1
              }))
          ])], {optional: true}
        ),
        query(':leave',
          stagger('50ms', [
            animate('100ms ease-out',
              style({
                transform: 'translateX(-100%)', opacity: 0
              }))
          ]), {optional: true}
        )
      ])
    ])
  ]
})
export class GoalsComponent implements OnInit {
  public goals: Goal[] = [];

  @Input()
  public activeGoal: Goal = Goal.empty();
  public rewardLevel: Level = Level.empty();
  searchText: String;

  constructor(private goalsService: GoalsService,
              private messageService: MessageService,
              private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.getGoals();
  }

  newGoal() {
    this.activeGoal = Goal.empty();
  }

  getGoals() {
    this.goalsService.getGoals().subscribe(
      (goals: Goal[]) => this.goals = goals,
      (error: HttpErrorResponse) => {
        if (!this.loginService.checkIfAuthenticationFailed(error)) {
          console.log(error);
          this.messageService.showErrorMessage('Nie można połączyć się z serwerem.');
        }
      },
    );
  }

  setActiveGoal(goal: Goal) {
    console.log(goal);
    this.activeGoal = goal;
  }

  showGoalDetails(goal: Goal) {
    this.activeGoal = goal;
  }

  showAddedGoal($event: Goal) {
    this.goals.push($event);
  }

  removeGoal($event: String) {
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
