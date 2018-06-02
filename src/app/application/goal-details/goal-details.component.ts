import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GoalsService} from '../goals/goals.service';
import {Goal} from '../goals/models/Goal';
import {ListItem} from '../goals/models/ListItem';
import {Level} from '../goals/models/Level';
import {MessageService} from '../../messages/message.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginService} from '../../login/login.service';

declare var $: any;

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent {

  @Input()
  public goal: Goal;

  @Output()
  levelRewardEvent = new EventEmitter<Level>();

  @Output()
  deleteGoalEvent = new EventEmitter<String>();

  public withChecklist = false;
  public withDailyHabit = false;

  constructor(private goalsService: GoalsService, private messageService: MessageService, private loginService: LoginService) {
  }

  showLevelReward(level: Level) {
    if (level.achieved) {
      this.levelRewardEvent.emit(level);
      $('#rewardModal').modal('show');

      if (this.goal.levels.indexOf(level) === this.goal.levels.length - 1) {
        this.goal.achieved = true;
      }
    } else {
      this.goal.achieved = false;
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

  updateGoal() {
    this.goalsService.updateGoal(this.goal).subscribe(value => this.messageService.showSuccessMessage('Zapisano.'),
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
}
