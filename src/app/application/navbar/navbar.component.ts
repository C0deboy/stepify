import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Goal} from '../goals/models/Goal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  newGoalEvent = new EventEmitter<Goal>();

  searchText: String;

  @Output()
  searchEvent = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  newGoal() {
    this.newGoalEvent.emit(Goal.empty());
  }

  search() {
    this.searchEvent.emit(this.searchText);
  }
}
