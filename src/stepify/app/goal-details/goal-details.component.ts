import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {GoalsService} from '../goals/goals.service';
import {Goal} from '../goals/models/Goal';
import {ListItem} from '../goals/models/ListItem';
import {Level} from '../goals/models/Level';
import {MessageService} from '../../messages/message.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginService} from '../../login/login.service';
import * as moment from 'moment';
import {e} from '@angular/core/src/render3';
import {Properties} from '../../properties';

declare var $: any;

@Component({
  selector: 'stepify-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.scss']
})
export class GoalDetailsComponent {

  @Input()
  public goal: Goal;

  @Input()
  public lastGoal: Goal;

  @Output()
  levelRewardEvent = new EventEmitter<Level>();

  @Output()
  deleteGoalEvent = new EventEmitter<String>();

  @Output()
  editGoalEvent = new EventEmitter<Goal>();

  constructor(private goalsService: GoalsService, private messageService: MessageService, private loginService: LoginService) {
  }

  showLevelReward(level: Level) {
    if (level.achieved) {
      level.achievedAt = moment();
      this.levelRewardEvent.emit(level);
      $('#rewardModal').modal('show');

      if (this.goal.levels.indexOf(level) === this.goal.levels.length - 1) {
        this.goal.achieved = true;
        this.goal.order = this.lastGoal.order + Properties.GOAL_ORDER_DIFF;
      }

    } else {
      this.goal.achieved = false;
      level.achievedAt = null;
      level.achievedProof = null;
    }
  }

  checkIfLevelAchieved(item: ListItem) {

    const stepRegexp = new RegExp('(^|\\s)' + item.value + '(\\s|$)', 'g');

    for (const level of this.goal.levels) {
      if (level.name.match(stepRegexp)) {
        if (item.checked) {
          level.achieved = true;
          this.showLevelReward(level);
        } else {
          level.achieved = false;
        }
        break;
      }
    }
  }

  editGoal() {
    this.editGoalEvent.emit(this.goal);
  }

  updateGoal(goal: Goal) {
    this.goalsService.updateGoal(goal).subscribe(value => this.messageService.showSuccessMessage('Zapisano.'),
      (error: HttpErrorResponse) => {
        if (!this.loginService.checkIfAuthenticationFailed(error)) {
          console.log(error);
          this.messageService.showErrorMessage('Nie udało się dodać celu.');

          error.error.errors.forEach(fieldError => {
            this.messageService.showErrorMessage(fieldError.defaultMessage);
          });
        }
      });

  }

  deleteGoal() {
    this.goalsService.deleteGoal(this.goal.id).subscribe(value => {
        this.messageService.showSuccessMessage('Cel został usunięty.');
        $('#goal-details').modal('hide');
        $('#confirmModal').modal('hide');
        this.deleteGoalEvent.emit(this.goal.id);
      },
      (error: HttpErrorResponse) => {
        if (!this.loginService.checkIfAuthenticationFailed(error)) {
          console.log(error);
          this.messageService.showErrorMessage('Nie udało się usunąć celu.');
        }
      }
    );
  }

  @HostListener('keydown', ['$event']) deleteBtn(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.deleteGoal();
    }
  }
}
