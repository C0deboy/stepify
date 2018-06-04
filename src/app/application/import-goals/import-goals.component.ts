import { Component, OnInit } from '@angular/core';
import {Goal} from '../goals/models/Goal';
import {Level} from '../goals/models/Level';
import {GoalsService} from '../goals/goals.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from '../../messages/message.service';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-import-goals',
  templateUrl: './import-goals.component.html',
  styleUrls: ['./import-goals.component.css']
})
export class ImportGoalsComponent implements OnInit {

  public importData = '';
  public goalDelimiter = '\n\n';
  public preDelimiter = ':';
  public postDelimiter = '–';

  private goalRegEx = new RegExp(this.preDelimiter + '(.*)' + this.postDelimiter);

  constructor(private messageService: MessageService,
              private loginService: LoginService,
              private goalsService: GoalsService) { }

  ngOnInit() {
  }

  import() {
    const data: string[]  = this.importData.trim().split(this.goalDelimiter);
    this.importData = '';
    let goalsAdded = 0;

    data.forEach((goalString, i) => {

      const goalData: string[] = goalString.split('\n');
      const newGoal = this.createGoalFromData(goalData);

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
        if (i === 0) {
          goal.name = line.trim();
          return;
        }

        const goalLevel = line.match(this.goalRegEx);
        if (goalLevel) {
          goal.addLevel(new Level(i, goalLevel[1].trim()));
        }
      }
    });
    return goal;
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
}
