import {AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Goal} from '../goals/models/Goal';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges {

  @Output()
  newGoalEvent = new EventEmitter<Goal>();

  searchText: String;
  currentUser: String;

  @Output()
  searchEvent = new EventEmitter<String>();

  constructor(private loginService: LoginService) {
    this.currentUser = localStorage.getItem('username');
  }

  ngOnChanges() {
    this.currentUser = localStorage.getItem('username');
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
