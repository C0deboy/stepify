import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Goal} from '../models/Goal';
import {Level} from '../models/Level';
import {GoalsService} from '../goals.service';
import {MessageService} from '../../../messages/message.service';
import {CheckList} from '../models/Checklist';
import {GoalsComponent} from '../goals.component';
import * as moment from 'moment';
import {DailyHabit} from '../models/daily-habit';
import {LoginService} from '../../../login/login.service';
import {HttpErrorResponse} from '@angular/common/http';

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
              private messageService: MessageService,
              private loginService: LoginService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.goal.checklist = null;
    this.goal.dailyHabit = null;

    $(this.elementRef.nativeElement).on('shown.bs.modal', function () {
      $(this).find('input').first().focus();
    });
  }

  ngOnChanges() {
    if (this.goal.dailyHabit) {
      this.goal.dailyHabit.everyday = false;
    }

    this.withDailyHabit = this.goal.isDailyHabitDefined();
    this.withChecklist = this.goal.isCheckListDefined();

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

  addLevel() {
    this.newLevel.level = this.goal.levels.length + 1;
    this.goal.addLevel(this.newLevel);
    this.newLevel = Level.empty();
    $('input[name="levelName"]').focus();
  }

  addGoal() {

    if (!this.withChecklist) {
      this.goal.checklist = null;
    }
    if (!this.withDailyHabit) {
      this.goal.dailyHabit = null;
    } else {
      this.goal.dailyHabit.fillDailyChecklist();
    }

    if (this.goal.id != null) {
      this.goalsService.updateGoal(this.goal).subscribe(() => {
          this.confirmSuccess('Zapisano.');
        },
        (error: HttpErrorResponse) => this.handleAddOrUpdate(error)
      );
    } else {
      this.goalsService.addGoal(this.goal).subscribe((goal: Goal) => {
          this.newGoalEvent.emit(Goal.deserialize(goal));
          this.confirmSuccess('Twój cel ' + this.goal.name + ' został dodany.');
        },
        (error: HttpErrorResponse) => this.handleAddOrUpdate(error)
      );
    }
  }

  private confirmSuccess(message: string) {
    $('#new-goal-wizard').modal('hide');
    this.messageService.showSuccessMessage(message);
    this.goal = Goal.empty();
  }

  private handleAddOrUpdate(error: HttpErrorResponse) {
    if (!this.loginService.checkIfAuthenticationFailed(error)) {
      console.log(error);
      this.messageService.showErrorMessage('Nie udało się dodać celu.');

      error.error.errors.forEach(fieldError => {
        this.messageService.showErrorMessage(fieldError.defaultMessage);
      });
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
    }
  }

  trackByFn(i) {
    return i;
  }
}
