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

  constructor(private messageService: MessageService) {}

  showLevelReward(level: Level) {
    this.levelRewardEvent.emit(level);
    $('#rewardModal').modal('show');
  }

  checkIfLevelAchieved(item: ListItem) {
    this.goal.levels.forEach((level) => {
      const stepRegexp = new RegExp('(^|\\s)' + item.value + '(\\s|$)', 'g');
      if (level.name.match(stepRegexp)) {
        if (item.checked) {
          level.achieved = true;
          this.showLevelReward(level);
        } else {
          level.achieved = false;
        }
      }
    });
  }

  confirmSave() {
    this.messageService.showSuccessMessage('Saved.');
  }
}
