import {Component, OnInit} from '@angular/core';
import {Goal} from '../goals/models/Goal';
import {Level} from '../goals/models/Level';
import {GoalsService} from '../goals/goals.service';
import {MessageService} from '../../messages/message.service';
import {CheckList} from '../goals/models/Checklist';
import {ListItem} from '../goals/models/ListItem';
import {GoalsComponent} from '../goals/goals.component';
import * as moment from 'moment';

moment.locale('pl-PL');

@Component({
  selector: 'app-new-goal-wizard',
  templateUrl: './new-goal-wizard.component.html',
  styleUrls: ['./new-goal-wizard.component.css']
})
export class NewGoalWizardComponent implements OnInit {
  public goal: Goal = Goal.empty();
  public newLevel: Level = Level.empty();
  public newChecklist: CheckList = CheckList.empty();
  public newListItem: ListItem = ListItem.empty();
  public withChecklist = false;
  public withDailyHabit = false;
  public weekdaysShorts = moment().localeData().weekdaysShort();

  constructor(private goalsService: GoalsService,
              private goalsComponent: GoalsComponent,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

  addLevel(level) {
    this.newLevel.level = level;
    this.goal.levels.push(this.newLevel);
    this.newLevel = Level.empty();
  }

  addListItem() {
    this.goal.checklist.list.push(this.newListItem);
    this.newListItem = ListItem.empty();
  }

  addGoal() {
    if (!this.withChecklist) {
      this.goal.checklist = null;
    }
    if (!this.withDailyHabit) {
      this.goal.dailyHabit = null;
    } else {
      this.goal.dailyHabit.dailyChecklist = new Array(this.goal.dailyHabit.getDaysDifference()).fill(0);
    }

    this.goalsService.addGoal(this.goal).subscribe((goal: Goal) => console.log(goal + 'todo push '),
      error2 => console.log(error2),
      () => console.log('always'));
    this.messageService.showSuccessMessage('Twój cel ' + this.goal.name + ' został dodany.');

    this.goal = Goal.empty();
  }

  private addSpecificDay(dayNum: number) {
    this.goal.dailyHabit.specificDays.push(dayNum);
  }

  private removeSpecificDay(index: number) {
    this.goal.dailyHabit.specificDays.splice(index, 1);
  }

  toggleSpecificDay(dayNum: number) {

    const i = this.goal.dailyHabit.specificDays.indexOf(dayNum);
    if (i === -1) {
      this.addSpecificDay(dayNum);
    } else {
      this.removeSpecificDay(i);
    }
    console.log(this.goal.dailyHabit.everyNDays);
    console.log(this.goal.dailyHabit.specificDays);
  }

  areSpecificDaysDefined(): boolean {
    if (this.goal.dailyHabit.specificDays.length > 0) {
      this.goal.dailyHabit.everyNDays = null;
      this.goal.dailyHabit.everyday = false;
      return true;
    } else {
      return false;
    }
  }
}
