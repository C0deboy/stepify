import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Goal} from '../models/Goal';
import {Level} from '../models/Level';
import {GoalsService} from '../goals.service';
import {MessageService} from '../../../messages/message.service';
import {CheckList} from '../models/Checklist';
import {ListItem} from '../models/ListItem';
import {GoalsComponent} from '../goals.component';
import * as moment from 'moment';
declare var $: any;

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
  public addMultilineChecklist = false;
  public weekdaysShorts = moment().localeData().weekdaysShort();

  @Output()
  newGoalEvent = new EventEmitter<Goal>();

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
    if (this.addMultilineChecklist) {
      this.newListItem.value.split('\n').forEach(listItem => {
        this.goal.checklist.list.push(new ListItem(listItem, false));
      });
    } else {
      this.goal.checklist.list.push(this.newListItem);
    }

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

    this.goalsService.addGoal(this.goal).subscribe((goal: Goal) => {
        console.log(goal);
        this.newGoalEvent.emit(goal);
        $('#new-goal-wizard').modal('hide');
        this.messageService.showSuccessMessage('Twój cel ' + this.goal.name + ' został dodany.');
        this.goal = Goal.empty();
      },
      error2 => console.log(error2)
    );
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
