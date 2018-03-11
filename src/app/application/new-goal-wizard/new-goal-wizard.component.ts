import { Component, OnInit } from '@angular/core';
import {Goal} from '../goals/models/Goal';
import {Level} from '../goals/models/Level';
import {GoalsService} from '../goals/goals.service';
import {MessageService} from '../../messages/message.service';

@Component({
  selector: 'app-new-goal-wizard',
  templateUrl: './new-goal-wizard.component.html',
  styleUrls: ['./new-goal-wizard.component.css']
})
export class NewGoalWizardComponent implements OnInit {
  public goal: Goal = new Goal('', []);
  public newLevel: Level = new Level(0, '' , '');
  constructor(private goalsService: GoalsService, private messageService: MessageService) { }

  ngOnInit() {
  }

  addLevel(level) {
    this.newLevel.level = level;
    this.goal.levels.push(this.newLevel);
    this.newLevel = new Level(0, '' , '');
  }

  addGoal() {
    this.goalsService.addGoal(this.goal);
    this.messageService.showSuccessMessage('Twój cel ' + this.goal.name + ' został dodany.');
    this.goal = new Goal('', []);
  }
}
