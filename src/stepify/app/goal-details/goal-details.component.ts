import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {GoalsService} from '../goals/goals.service';
import {Goal} from '../goals/models/Goal';
import {ListItem} from '../goals/models/ListItem';
import {Level} from '../goals/models/Level';
import {MessageService} from '../../messages/message.service';
import {HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';
import {Properties} from '../../properties';
import {CheckList} from '../goals/models/Checklist';
import {elementAt} from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'stepify-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.scss']
})
export class GoalDetailsComponent implements AfterViewInit{
  @ViewChild('checklistProgress')
  checklistProgress: ElementRef;

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

  constructor(private goalsService: GoalsService, private messageService: MessageService) {}

  ngAfterViewInit(): void {
    $('#goal-details').on('shown.bs.modal', (event) => {
      const progressEl = this.checklistProgress.nativeElement;
      const elements = progressEl.parentElement.querySelectorAll('.checklist .mat-checkbox-checked');
      if (elements.length !== 0) {
        const list =  progressEl.parentElement.querySelector('.checklist ul');
        console.log(list);
        list.focus();
        const element = elements[elements.length - 1];
        console.log(element);
        element.scrollIntoView({behavior: 'smooth'});
      }
    });
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
        this.messageService.showMessageBasedOnError(error, 'Nie udało się dodać celu.');
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
        this.messageService.showMessageBasedOnError(error, 'Nie udało się usunąć celu.');
      }
    );
  }

  @HostListener('keydown', ['$event']) deleteBtn(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.deleteGoal();
    }
  }

  getChecklistProgress(checklist: CheckList): number {
    const allItems = checklist.list.length;
    const doneItems = checklist.list.filter(item => item.checked).length;
    const percent = Math.round(doneItems * 100 / allItems);
    if (this.checklistProgress !== undefined) {
      this.checklistProgress.nativeElement.style.width = percent + '%';
    }
    return percent;
  }
}
