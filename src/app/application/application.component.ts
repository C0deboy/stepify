import { Component, OnInit } from '@angular/core';
import {Goal} from './goals/models/Goal';
import {Level} from './goals/models/Level';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  activeGoal: Goal = new Goal('', []);
  rewardEventLevel: Level = new Level(0, '' , '');

  setActiveGoal(event: Goal) {
    this.activeGoal = event;
  }

  setRewardEventLevel(event: Level) {
    this.rewardEventLevel = event;
  }

  constructor() { }

  ngOnInit() {
  }

}
