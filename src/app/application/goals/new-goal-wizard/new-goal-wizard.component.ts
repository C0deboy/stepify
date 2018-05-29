import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Goal} from '../models/Goal';
import {Level} from '../models/Level';
import {GoalsService} from '../goals.service';
import {MessageService} from '../../../messages/message.service';
import {CheckList} from '../models/Checklist';
import {ListItem} from '../models/ListItem';
import {GoalsComponent} from '../goals.component';
import * as moment from 'moment';
import {DailyHabit} from '../models/daily-habit';

declare var $: any;

moment.locale('pl-PL');

@Component({
  selector: 'app-new-goal-wizard',
  templateUrl: './new-goal-wizard.component.html',
  styleUrls: ['./new-goal-wizard.component.css']
})
export class NewGoalWizardComponent implements OnInit, OnChanges {
  @Input()
  public goal: Goal;
  public newLevel: Level = Level.empty();
  public withChecklist = false;
  public withDailyHabit = false;
  public addMultilineChecklist = false;
  public listItemValue: string;
  public weekdaysShorts = moment().localeData().weekdaysShort();
  public actionButtonText = 'Dodaj cel';

  @Output()
  newGoalEvent = new EventEmitter<Goal>();

  constructor(private goalsService: GoalsService,
              private goalsComponent: GoalsComponent,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.goal.checklist = null;
    this.goal.dailyHabit = null;
  }

  ngOnChanges() {
    if (this.goal.dailyHabit) {
      this.goal.dailyHabit.everyday = false;
    }

    this.withDailyHabit = this.goal.dailyHabit && this.goal.dailyHabit.dailyChecklist.length > 0;
    this.withChecklist = this.goal.checklist && this.goal.checklist.list.length > 0;

    if (this.goal.id != null) {
      this.actionButtonText = 'Zapisz';
    } else {
      this.actionButtonText = 'Dodaj cel';
    }
  }

  addListItem(value: string) {
    if (this.addMultilineChecklist) {
      const values = value.split('\n');
      this.goal.checklist.addItems(values);
    } else {
      this.goal.checklist.addItem(value);
    }

    this.listItemValue = '';
  }

  addLevel(level) {
    this.newLevel.level = level;
    this.goal.levels.push(this.newLevel);
    this.newLevel = Level.empty();
  }

  removeLevel(index) {
    this.goal.levels.splice(index, 1);
    this.goal.levels.forEach((level, i) => level.level = i + 1);
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

    if (this.goal.id != null) {
      this.goalsService.updateGoal(this.goal).subscribe((goal: Goal) => {
          $('#new-goal-wizard').modal('hide');
          this.messageService.showSuccessMessage('Zapisano.');
          this.goal = Goal.empty();
        },
        error => console.log(error)
      );
    } else {
      this.goalsService.addGoal(this.goal).subscribe((goal: Goal) => {
          this.newGoalEvent.emit(goal);
          $('#new-goal-wizard').modal('hide');
          this.messageService.showSuccessMessage('Twój cel ' + this.goal.name + ' został dodany.');
          this.goal = Goal.empty();
        },
        error => console.log(error)
      );
    }
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
    if (this.goal.dailyHabit.specificDays == null) {
      return false;
    }
    if (this.goal.dailyHabit.specificDays.length > 0) {
      this.goal.dailyHabit.everyNDays = null;
      this.goal.dailyHabit.everyday = false;
      return true;
    } else {
      return false;
    }
  }

  inlcudedDay(i: number) {
    if (this.goal.dailyHabit.specificDays == null) {
      return false;
    } else {
      return this.goal.dailyHabit.specificDays.includes(i);
    }
  }

  toggleChecklist() {
    if (this.withChecklist) {
      this.goal.checklist = CheckList.empty();
    } else {
      this.goal.checklist = null;
    }
  }

  toggleDailyHabit() {
    if (this.withDailyHabit) {
      this.goal.dailyHabit = DailyHabit.empty();
    } else {
      this.goal.dailyHabit = null;
    }
  }

  toggleEveryday() {
    if (this.goal.dailyHabit.everyday) {
      this.goal.dailyHabit.specificDays = [];
      this.goal.dailyHabit.everyNDays = 1;
      console.log(this.goal.dailyHabit);
    }
  }

  trackByFn(i) {
    return i;
  }
}
