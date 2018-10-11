import {Component, HostListener, Input, OnInit} from '@angular/core';
import {GoalsService} from './goals.service';
import {Goal} from './models/Goal';
import {Level} from './models/Level';
import {MessageService} from '../../messages/message.service';
import {HttpErrorResponse} from '@angular/common/http';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';
import {GoalDetailsComponent} from '../goal-details/goal-details.component';
import {Properties} from '../../properties';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('* => *', [
        query(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          stagger('50ms', [
            animate('100ms ease-in',
              style({
                transform: 'translateX(0)', opacity: 1
              }))
          ])], {optional: true}
        ),
        query(':leave',
          style({display: 'none'}), {optional: true}
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
  displayAsList: boolean;
  pickedUpGoal: Goal;
  pickedUpGoalIndex: number;

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

  pickUpGoal(goal: Goal, index: number) {
    this.pickedUpGoal = goal;
    this.pickedUpGoalIndex = index;
  }

  reorderGoal(index: number) {// index of goal we drop on

    document.getElementById('goal-' + index).parentElement.style.borderLeft = 'none';

    if (this.pickedUpGoalIndex === index) {
      return;
    }

    const previousGoal = this.goals[index - 1];
    const thisGoal = this.goals[index];

    if (this.pickedUpGoal.achieved !== thisGoal.achieved) {
      this.messageService.showErrorMessage('Nie można mieszać celów między sekcjami.');
      return;
    }

    const previousOrder = previousGoal !== undefined ? previousGoal.order : thisGoal.order - Properties.GOAL_ORDER_DIFF;
    const nextOrder = thisGoal.order;

    this.pickedUpGoal.order = (previousOrder + nextOrder) / 2;

    this.updateGoal();

    this.goals.splice(this.pickedUpGoalIndex, 1);
    this.goals.splice(index, 0, this.pickedUpGoal);
  }

  private updateGoal() {
    this.goalsService.updateGoal(this.pickedUpGoal).subscribe(value => this.messageService.showSuccessMessage('Zmieniono pozycję.'),
      (error: HttpErrorResponse) => {
        if (!this.loginService.checkIfAuthenticationFailed(error)) {
          console.log(error);
          this.messageService.showErrorMessage('Nie udało się zmienić pozycji.');

          error.error.errors.forEach(fieldError => {
            this.messageService.showErrorMessage(fieldError.defaultMessage);
          });
        }
      });

  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event.target'])
  onDragEnter(target) {
    if (target.classList.contains('goal')) {
      const targetIndex = target.id.split('-')[1];

      if (this.pickedUpGoalIndex < targetIndex) {
        target.parentElement.style.borderRight = 20 + 'px solid rgba(0, 0, 0, .1)';
      } else if (this.pickedUpGoalIndex > targetIndex) {
        target.parentElement.style.borderLeft = 20 + 'px solid rgba(0, 0, 0, .1)';
      }
    }
  }

  @HostListener('dragleave', ['$event.target'])
  onDragLeave(target) {
    if (target.classList.contains('goal')) {
        target.parentElement.style.borderLeft = 'none';
        target.parentElement.style.borderRight = 'none';
    }
  }
}
