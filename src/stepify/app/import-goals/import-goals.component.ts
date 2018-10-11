import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Goal} from '../goals/models/Goal';
import {Level} from '../goals/models/Level';
import {GoalsService} from '../goals/goals.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from '../../messages/message.service';
import {LoginService} from '../../login/login.service';
import TurndownService from 'turndown';
import * as moment from 'moment';
import {MdRegex} from './md-regex';

@Component({
  selector: 'stepify-import-goals',
  templateUrl: './import-goals.component.html',
  styleUrls: ['./import-goals.component.scss']
})
export class ImportGoalsComponent implements OnInit {

  public goalsToBeImported: Goal[] = [];
  public importData = '';
  public goalDelimiter = '\n\n';
  public goalPrefix = '**';
  public goalSuffix = '**';
  public levelPrefix = ':';
  public levelSuffix = '–';
  public inspiredByPrefix = 'Inspiracja:';
  public inspiredBySuffix = '';
  public achievedAtPrefix = 'Wykonane';
  public achievedAtSuffix = '';
  public toBeDoneAtPrefix = 'Cel:';
  public toBeDoneAtSuffix = '';

  private goalRegEx = new MdRegex(this.goalPrefix, this.goalSuffix);
  private levelRegEx = new MdRegex(this.levelPrefix, this.levelSuffix);
  private inspiredByRegEx = new MdRegex(this.inspiredByPrefix, this.inspiredBySuffix);
  private achievedRegex = new MdRegex(this.achievedAtPrefix, this.achievedAtSuffix, '\\d[.\\-\\\d]{7,8}\\d');
  private toBeDoneAtdRegex = new MdRegex(this.toBeDoneAtPrefix, this.toBeDoneAtSuffix, '\\d[.\\-\\\d]{2,8}\\d');


  private data: string[];

  @Output()
  newGoalEvent = new EventEmitter<Goal>();

  constructor(private messageService: MessageService,
              private loginService: LoginService,
              private goalsService: GoalsService) {
  }

  ngOnInit() {
  }

  checkImport() {
    this.data = this.importData.trim().split(this.goalDelimiter);
    this.importData = '';

    this.data.forEach((goalString, i) => {
      const goalData: string[] = goalString.split('\n');
      const newGoal = this.createGoalFromData(goalData);
      this.goalsToBeImported.push(newGoal);
    });
  }

  import() {
    const totalGoals = this.goalsToBeImported.length - 1;
    let goalsAdded = 0;
    let goalsFailed = 0;
    this.goalsToBeImported.forEach((newGoal, i) => {
      this.goalsService.addGoal(newGoal).subscribe((goal: Goal) => {
          goalsAdded++;
          this.newGoalEvent.emit(Goal.deserialize(goal));
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          goalsFailed++;
          this.importData += this.data[i] + this.goalDelimiter;
        },
        () => {
          if (i === totalGoals) {
            this.clear();
            this.messageService.showSuccessMessage('Zaimportowano ' + goalsAdded + ' celów.');
            if (goalsFailed > 0) {
              this.messageService.showErrorMessage('Nie udało się zaimportować ' + goalsFailed + ' celów.');
            }
          }
        }
      );
    });
  }

  clear() {
    this.goalsToBeImported = [];
  }

  private createGoalFromData(goalData: string[]) {
    const goal = new Goal();

    goalData.forEach((line, i) => {
      if (line && line !== '') {
        if (!lookForGoalName(line, this.goalRegEx)) {
          if (!lookForGoalLevel(line, i, this.levelRegEx, this.achievedRegex, this.toBeDoneAtdRegex)) {
            lookForInspiredBy(line, this.inspiredByRegEx);
          }
        }
      }
    });
    return goal;

    function lookForGoalName(line: string, regex: MdRegex): boolean {
      const goalName = line.match(regex.get());
      if (goalName) {
        goal.name = goalName[1].trim();
        return true;
      } else {
        return false;
      }
    }

    function lookForGoalLevel(line: string, i: number, regex: MdRegex, achievedRegex: MdRegex, toBeDoneAtdRegex: MdRegex): boolean {
      const resultMdLink = line.match(regex.getForMdLink());

      if (resultMdLink) {
        const level = new Level(i, resultMdLink[1].trim());
        lookForAchivedInfo(level);
        lookForToBeDoneDate(level);
        goal.addLevel(level);
        return true;
      } else {
        const result = line.match(regex.get());
        if (result) {
          const level = new Level(i, result[1].trim());
          lookForAchivedInfo(level);
          lookForToBeDoneDate(level);
          goal.addLevel(level);
          return true;
        } else {
          return false;
        }
      }

      function lookForAchivedInfo(level) {
        const achievedMdResult = line.match(achievedRegex.getForMdLink());
        const formats = ['DD-MM-YYYY', 'YYYY-MM-DD'];
        if (achievedMdResult) {
          level.achieved = true;
          level.achievedAt = moment(achievedMdResult[1].trim(), formats);
          level.achievedProof = achievedMdResult[2].trim();
        } else {
          const achievedResult = line.match(achievedRegex.get());
          if (achievedResult) {
            level.achieved = true;
            level.achievedAt = moment(achievedResult[1].trim(), formats);
          }
        }
      }

      function lookForToBeDoneDate(level: Level) {
        const dateResult = line.match(toBeDoneAtdRegex.get());

        if (dateResult) {
          console.log(dateResult[1].trim());
          level.toBeDoneAt = dateResult[1].trim();
        }
      }
    }

    function lookForInspiredBy(line: string, regex: MdRegex): boolean {
      const resultMdLink = line.match(regex.getForMdLink());
      if (resultMdLink) {
        goal.inspiredBy = resultMdLink[1].trim();
        goal.inspiredByLink = resultMdLink[2].trim();
        return true;
      } else {
        const result = line.match(regex.get());
        if (result) {
          goal.inspiredBy = result[1].trim();
          return true;
        } else {
          return false;
        }
      }
    }
  }

  @HostListener('paste', ['$event']) pasteAsRichText(event: ClipboardEvent) {
    event.preventDefault();

    const pastedText = event.clipboardData.getData('text/html');

    this.importData = new TurndownService().turndown(pastedText);

  }
}
