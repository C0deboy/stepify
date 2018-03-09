import { Component, OnInit } from '@angular/core';
import {Goal} from './goals/models/Goal';
import {Level} from './goals/models/Level';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  activeGoal: Goal;
  rewardEventLevel: Level;

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
