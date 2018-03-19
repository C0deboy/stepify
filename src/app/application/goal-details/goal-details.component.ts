import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GoalsService} from '../goals/goals.service';
import {Goal} from '../goals/models/Goal';
import {Location} from '@angular/common';
import {ListItem} from '../goals/models/ListItem';
import {Level} from '../goals/models/Level';
import {MessageService} from '../../messages/message.service';
import {DailyHabit} from '../goals/models/daily-habit';
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
  deleteGoalEvent = new EventEmitter<number>();

  public withChecklist = false;
  public withDailyHabit = false;

  constructor(private goalsService: GoalsService, private messageService: MessageService) {}

  showLevelReward(level: Level) {
    if(level.achieved) {
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
      error2 => console.log(error2));

  }

  deleteGoal() {
    this.goalsService.deleteGoal(this.goal.id).subscribe(value => {
        this.messageService.showSuccessMessage('Cel został usunięty.');
        $('#goal-details').modal('hide');
        this.deleteGoalEvent.emit(this.goal.id);
      },
        error2 => console.log(error2)
    );
  }

  newDailyHabit() {
    this.goal.dailyHabit = DailyHabit.empty();
  }

  addDailyHabit() {
    this.withDailyHabit = false;
  }
}
