import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GoalsService} from '../goals/goals.service';
import {Goal} from '../goals/Goal';
import {Location} from '@angular/common';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {
  public goal: Goal;

  constructor(
    private route: ActivatedRoute,
    private goalsService: GoalsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.goalsService.getGoal(id)
      .subscribe(goal => this.goal = goal[0]);
  }

  goBack(): void {
    this.location.back();
  }

}
