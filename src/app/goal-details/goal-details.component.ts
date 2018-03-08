import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GoalsService} from '../goals/goals.service';
import {Goal} from '../goals/models/Goal';
import {Location} from '@angular/common';
import {ListItem} from '../goals/models/ListItem';
import {Level} from '../goals/models/Level';
declare var $: any;

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {
  @Input()
  public goalId: number;
  public goal: Goal;
  @Output()
  levelRewardEvent = new EventEmitter<Level>();

  constructor(
    private route: ActivatedRoute,
    private goalsService: GoalsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getGoal();
  }

  getGoal(): void {
    this.goalsService.getGoal(this.goalId)
      .subscribe(goal => this.goal = goal[0]);
  }

  updateGoal(goal) {
    console.log(goal);
    this.goalsService.updateGoal(goal).subscribe(
      updatedGoal => this.goal = updatedGoal
    );
  }

  goBack(): void {
    this.location.back();
  }

  checkIfLevelAchieved(item: ListItem) {
    this.goal.levels.forEach((level) => {
      const stepRegexp = new RegExp('(^|\\s)' + item.value + '(\\s|$)', 'g');
      if (level.name.match(stepRegexp)) {
        if (item.checked) {
          level.achieved = true;
          $('#goal-' + this.goalId).modal('toggle');
          $('#rewardModal').modal('show');
        } else {
          level.achieved = false;
        }
      }
    });
  }
}
