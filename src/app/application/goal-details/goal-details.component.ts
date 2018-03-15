import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GoalsService} from '../goals/goals.service';
import {Goal} from '../goals/models/Goal';
import {Location} from '@angular/common';
import {ListItem} from '../goals/models/ListItem';
import {Level} from '../goals/models/Level';
import {MessageService} from '../../messages/message.service';
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

  constructor(private goalsService: GoalsService, private messageService: MessageService) {}

  showLevelReward(level: Level) {
    if(level.achieved) {
      this.levelRewardEvent.emit(level);
      $('#rewardModal').modal('show');
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
      },
        error2 => console.log(error2)
    );
  }
}
