import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Goal} from '../goals/models/Goal';
import {LoginService} from '../../login/login.service';

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

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  newGoal() {
    this.newGoalEvent.emit(Goal.empty());
  }

  search() {
    this.searchEvent.emit(this.searchText);
  }

  logout() {
    this.loginService.logout();
  }
}
