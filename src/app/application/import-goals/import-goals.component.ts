import {Component, HostListener, OnInit} from '@angular/core';
import {Goal} from '../goals/models/Goal';
import {Level} from '../goals/models/Level';
import {GoalsService} from '../goals/goals.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from '../../messages/message.service';
import {LoginService} from '../../login/login.service';
import TurndownService from 'turndown';
import * as moment from 'moment';

@Component({
  selector: 'app-import-goals',
  templateUrl: './import-goals.component.html',
  styleUrls: ['./import-goals.component.css']
})
export class ImportGoalsComponent implements OnInit {

  public importData = '';
  public goalDelimiter = '\n\n';
  public goalPrefix = '\\*\\*';
  public goalSuffix = '\\*\\*';
  public levelPrefix = ':';
  public levelSuffix = '–';
  public inspiredByPrefix = 'Inspiracja:';
  public inspiredBySuffix = '$';
  public achievedAtPrefix = 'Wykonane';
  public achievedAtSuffix = '\\)';

  private goalRegEx = new RegExp(this.goalPrefix + '(.*?)' + this.goalSuffix);
  private levelRegEx = new RegExp(this.levelPrefix + '(.*?)' + this.levelSuffix);
  private inspiredByRegEx = new RegExp(this.inspiredByPrefix + '(.*?)' + this.inspiredBySuffix);
  private achievedMdRegex = new RegExp('\\[' + this.achievedAtPrefix + '\\s+(\\d.*\\d)]\\((.*?)\\)');
  private achievedRegex = new RegExp(this.achievedAtPrefix + '[\\s:]*(\\d[.\\-\\\\\\d]{7,8}\\d)');

  public goalsToBeImported: Goal[] = [];
  private data: string[];

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
    let goalsAdded = 0;
    this.goalsToBeImported.forEach((newGoal, i) => {
      this.goalsService.addGoal(newGoal).subscribe((goal: Goal) => goalsAdded++,
        (error: HttpErrorResponse) => {
          this.handleAddOrUpdate(error);
          this.importData += this.data[i] + this.goalDelimiter;
          this.goalsToBeImported.splice(i, 1);
        },
        () => {
          if (i === this.goalsToBeImported.length - 1) {
            this.messageService.showSuccessMessage('Zaimportowano ' + goalsAdded + ' celów.');
          }
        }
      );
    });
  }

  clear() {
    this.data = [];
    this.goalsToBeImported = [];
  }

  private createGoalFromData(goalData: string[]) {
    const goal = new Goal();

    goalData.forEach((line, i) => {
      if (line && line !== '') {

        const goalLevel = line.match(this.levelRegEx);
        const goalInspiredBy = line.match(this.inspiredByRegEx);

        if (!lookForGoalName(line, this.goalRegEx)) {
          if (!lookForGoalLevel(line, i, this.levelRegEx, this.achievedMdRegex, this.achievedRegex)) {
            lookForInspiredBy(line, this.inspiredByRegEx);
          }
        }
      }
    });
    return goal;

    function lookForGoalName(line: string, regex): boolean {
      const goalName = line.match(regex);
      if (goalName) {
        const data = parseValues(goalName[1]);

        goal.name = data.get('name');
        return true;
      } else {
        return false;
      }
    }

    function lookForGoalLevel(line: string, i: number, regex: RegExp, achievedMdRegex: RegExp, achievedRegex: RegExp): boolean {
      const result = line.match(regex);
      if (result) {
        const data = parseValues(result[1]);
        const level = new Level(i, data.get('name'));

        const achievedMdResult = line.match(achievedMdRegex);
        console.log(achievedMdRegex);
        console.log(achievedMdResult);
        if (achievedMdResult) {
          level.achieved = true;
          level.achievedAt = moment(achievedMdResult[1], 'DD.MM.YYYY');
          level.achievedProof = achievedMdResult[2];
        } else {
          const achievedResult = line.match(achievedRegex);
          console.log(achievedRegex);
          console.log(achievedResult);
          if (achievedResult) {
            level.achieved = true;
            level.achievedAt = moment(achievedResult[1], 'DD.MM.YYYY');
          }
        }
        goal.addLevel(level) ;
        return true;
      } else {
        return false;
      }
    }

    function lookForInspiredBy(line: string, regex): boolean {
      const result = line.match(regex);
      if (result) {
        const data = parseValues(result[1]);

        if (data.has('link')) {
          goal.inspiredByLink = data.get('link');
        }
        goal.inspiredBy = data.get('name');
        return true;
      } else {
        return false;
      }
    }

    function parseValues(line: string): Map<string, string> {
      const data = new Map();
      const mdLinRegex = new RegExp('\\[(.*)]\\((.*)\\)');
      const result = line.match(mdLinRegex);
      if (result) {
        data.set('name', result[1]);
        data.set('link', result[2]);
      } else {
        data.set('name', line.trim());
      }

      return data;
    }
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

  @HostListener('paste', ['$event']) pasteAsRichText(event: ClipboardEvent) {
    event.preventDefault();

    const pastedText = event.clipboardData.getData('text/html');

    this.importData = new TurndownService().turndown(pastedText);

  }
}
