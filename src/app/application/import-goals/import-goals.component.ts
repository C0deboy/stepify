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
  public achievedAtPrefix = '\\[Wykonane ';
  public achievedAtSuffix = '\\)';

  private goalRegEx = new RegExp(this.goalPrefix + '(.*?)' + this.goalSuffix);
  private levelRegEx = new RegExp(this.levelPrefix + '(.*?)' + this.levelSuffix);
  private inspiredByRegEx = new RegExp(this.inspiredByPrefix + '(.*?)' + this.inspiredBySuffix);
  private achievedRegex = new RegExp(this.achievedAtPrefix + '(.*?)' + this.achievedAtSuffix);

  constructor(private messageService: MessageService,
              private loginService: LoginService,
              private goalsService: GoalsService) {
  }

  ngOnInit() {
  }

  import() {
    const data: string[] = this.importData.trim().split(this.goalDelimiter);
    this.importData = '';
    let goalsAdded = 0;

    data.forEach((goalString, i) => {

      const goalData: string[] = goalString.split('\n');
      const newGoal = this.createGoalFromData(goalData);
      console.log(newGoal);
      this.goalsService.addGoal(newGoal).subscribe((goal: Goal) => goalsAdded++,
        (error: HttpErrorResponse) => {
          this.handleAddOrUpdate(error);
          this.importData += data[i] + this.goalDelimiter;
        },
        () => {
          if (i === data.length - 1) {
            this.messageService.showSuccessMessage('Zaimportowano ' + goalsAdded + ' celów.');
          }
        }
      );
    });
  }

  private createGoalFromData(goalData: string[]) {
    const goal = new Goal();

    goalData.forEach((line, i) => {
      if (line && line !== '') {

        const goalLevel = line.match(this.levelRegEx);
        const goalInspiredBy = line.match(this.inspiredByRegEx);

        if (!lookForGoalName(line, this.goalRegEx)) {
          if (!lookForGoalLevel(line, i, this.levelRegEx, this.achievedRegex)) {
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

    function lookForGoalLevel(line: string, i: number, regex: RegExp, achievedRegex: RegExp): boolean {
      const result = line.match(regex);
      if (result) {
        const data = parseValues(result[1]);
        const level = new Level(i, data.get('name'));

        if (data.has('link')) {
          level.achievedProof = data.get('link');
        }

        const achievedResult = line.match(achievedRegex);

        if (achievedResult) {
          level.achieved = true;
          const data2 = parseValues(achievedResult[0]);
          if (data2.has('link')) {
            level.achievedProof = data2.get('link');
          }
          const achievedAt = data2.get('name').match(/\d.*\d/g);
          if (achievedAt) {
            level.achievedAt = moment(achievedAt[0].replace(/\./g, '/'));
            console.log(level.achievedAt);
            console.log(moment());
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
    console.log(event.clipboardData);
    event.preventDefault();

    const pastedText = event.clipboardData.getData('text/html');

    this.importData = new TurndownService().turndown(pastedText);

  }
}
